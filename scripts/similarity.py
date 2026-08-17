#!/usr/bin/env python3
"""
Near-duplicate measurement harness for the generated city/language/service pages.

Why this exists: the site generates thousands of pages from the same templates, and
the failure mode that keeps them out of Google's index is near-duplicate content.
This script is the objective gate for that.

Three metrics, because one is not enough:

  full        difflib.SequenceMatcher ratio over the whole rendered page text.
              Comparable to the numbers recorded before this harness existed, but
              dominated by the ~1,176 words of header/footer/nav boilerplate that
              appear on every page, so it can never look good and it hides
              regressions in the part we actually control.

  content     Same ratio, but with header / mobile menu / footer / action bar
              stripped. THIS IS THE PRIMARY NUMBER.

  jaccard     5-gram shingle Jaccard over the content-only text. Order-invariant,
              which is how real near-duplicate detection works. Included so that
              shuffling section order — which would flatter the difflib ratio
              without making pages any less duplicative — shows no improvement.

Sampling is deliberately adversarial. A random sample of page pairs is dominated by
unrelated pages and reports a flattering number. The pairs that actually decide
whether these pages get indexed are the confusable ones:

  same-language-same-state   same language, two cities in one state (hardest case:
                             shares archetype, state authorities and script notes)
  same-pair-diff-service     same city+language, different service
  same-city-diff-language    same city, two different languages

Usage:
    python3 scripts/similarity.py                  # default cohorts, 40 pairs each
    python3 scripts/similarity.py --pairs 100
    python3 scripts/similarity.py --dist dist --worst 20
"""

from __future__ import annotations

import argparse
import difflib
import random
import re
import sys
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CITIES_TS = REPO / "src" / "content" / "cities.ts"

# Boilerplate that appears identically on every page. Stripped for the "content" metric.
# The mobile menu is a sibling of <header> and runs until the page's own first
# <section> (or the footer, on pages that have no sections), so it needs a lookahead
# rather than a closing-tag match.
BOILERPLATE_PATTERNS = [
    re.compile(r"<header\b.*?</header>", re.S),
    re.compile(r'<div id="mobile-menu".*?(?=<section\b|<footer\b)', re.S),
    re.compile(r"<footer\b.*?</footer>", re.S),
    re.compile(r'<nav aria-label="Quick actions".*?</nav>', re.S),
]

SHINGLE_N = 5


def page_text(html: str) -> str:
    """Rendered visible text of a page, tags and scripts removed."""
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.S)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", html).strip()


def content_text(html: str) -> str:
    """Page text with shared chrome removed — the part we actually author."""
    for pattern in BOILERPLATE_PATTERNS:
        html = pattern.sub(" ", html)
    return page_text(html)


def shingles(text: str, n: int = SHINGLE_N) -> set[str]:
    words = text.lower().split()
    if len(words) < n:
        return {" ".join(words)} if words else set()
    return {" ".join(words[i : i + n]) for i in range(len(words) - n + 1)}


def jaccard(a: set[str], b: set[str]) -> float:
    if not a and not b:
        return 1.0
    union = a | b
    return len(a & b) / len(union) if union else 1.0


def ratio(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, a, b).ratio()


@dataclass
class Page:
    route: str          # e.g. "pune/korean/translator"
    city: str | None
    language: str
    service: str
    full: str
    content: str
    shingles: set[str]


def parse_city_states() -> dict[str, str]:
    """slug -> stateSlug, read straight from cities.ts so cohorts follow the data."""
    if not CITIES_TS.exists():
        return {}
    src = CITIES_TS.read_text()
    pairs = re.findall(r'slug:\s*"([^"]+)"[^}]*?stateSlug:\s*"([^"]+)"', src, re.S)
    return {slug: state for slug, state in pairs}


def load_pages(dist: Path, city_states: dict[str, str]) -> list[Page]:
    pages: list[Page] = []
    for path in dist.rglob("index.html"):
        rel = path.relative_to(dist).parent.as_posix()
        parts = rel.split("/")
        # Only the generated service pages: <city>/<lang>/<service> or <lang>/<service>
        if len(parts) == 3:
            city, language, service = parts
            if city in ("locations", "services") or city not in city_states:
                continue
        elif len(parts) == 2:
            city, (language, service) = None, parts
            if language in ("locations", "services"):
                continue
        else:
            continue

        html = path.read_text(errors="replace")
        content = content_text(html)
        pages.append(
            Page(
                route=rel,
                city=city,
                language=language,
                service=service,
                full=page_text(html),
                content=content,
                shingles=shingles(content),
            )
        )
    return pages


def build_cohorts(
    pages: list[Page], city_states: dict[str, str], limit: int, rng: random.Random
) -> dict[str, list[tuple[Page, Page]]]:
    by_route = {p.route: p for p in pages}
    city_pages = [p for p in pages if p.city]

    def sample(candidates: list[tuple[Page, Page]]) -> list[tuple[Page, Page]]:
        rng.shuffle(candidates)
        return candidates[:limit]

    # (i) same language + service, two cities in the same state — the hardest cohort
    same_state: list[tuple[Page, Page]] = []
    buckets: dict[tuple[str, str, str], list[Page]] = {}
    for p in city_pages:
        buckets.setdefault((city_states[p.city], p.language, p.service), []).append(p)
    for group in buckets.values():
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                same_state.append((group[i], group[j]))

    # (ii) same city + language, different service
    diff_service: list[tuple[Page, Page]] = []
    pair_buckets: dict[tuple[str, str], list[Page]] = {}
    for p in city_pages:
        pair_buckets.setdefault((p.city, p.language), []).append(p)
    for group in pair_buckets.values():
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                diff_service.append((group[i], group[j]))

    # (iii) same city + service, different language
    diff_language: list[tuple[Page, Page]] = []
    lang_buckets: dict[tuple[str, str], list[Page]] = {}
    for p in city_pages:
        lang_buckets.setdefault((p.city, p.service), []).append(p)
    for group in lang_buckets.values():
        picks = rng.sample(group, min(len(group), 6))
        for i in range(len(picks)):
            for j in range(i + 1, len(picks)):
                diff_language.append((picks[i], picks[j]))

    return {
        "same-language-same-state": sample(same_state),
        "same-pair-diff-service": sample(diff_service),
        "same-city-diff-language": sample(diff_language),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dist", default="dist")
    ap.add_argument("--pairs", type=int, default=40, help="pairs sampled per cohort")
    ap.add_argument("--worst", type=int, default=10, help="worst offenders to list")
    ap.add_argument("--seed", type=int, default=17, help="fixed so runs are comparable")
    args = ap.parse_args()

    dist = (REPO / args.dist) if not Path(args.dist).is_absolute() else Path(args.dist)
    if not dist.exists():
        print(f"error: {dist} not found — run `npm run build` first", file=sys.stderr)
        return 1

    rng = random.Random(args.seed)
    city_states = parse_city_states()
    pages = load_pages(dist, city_states)
    if not pages:
        print("error: no service pages found in dist", file=sys.stderr)
        return 1

    words = [len(p.content.split()) for p in pages]
    words.sort()
    print(f"pages analysed:        {len(pages)}")
    print(
        f"unique words/page:     min {words[0]}  median {words[len(words)//2]}  max {words[-1]}"
    )
    print()

    cohorts = build_cohorts(pages, city_states, args.pairs, rng)
    all_scored: list[tuple[float, float, float, Page, Page, str]] = []

    print(f"{'cohort':<28} {'pairs':>5} {'full':>8} {'content':>9} {'jaccard':>9}")
    print("-" * 62)
    for name, pairs in cohorts.items():
        if not pairs:
            print(f"{name:<28} {'0':>5} {'--':>8} {'--':>9} {'--':>9}")
            continue
        scored = []
        for a, b in pairs:
            f = ratio(a.full, b.full)
            c = ratio(a.content, b.content)
            j = jaccard(a.shingles, b.shingles)
            scored.append((c, f, j, a, b))
            all_scored.append((c, f, j, a, b, name))
        avg_f = sum(s[1] for s in scored) / len(scored)
        avg_c = sum(s[0] for s in scored) / len(scored)
        avg_j = sum(s[2] for s in scored) / len(scored)
        print(f"{name:<28} {len(scored):>5} {avg_f:>8.3f} {avg_c:>9.3f} {avg_j:>9.3f}")

    print()
    print(f"worst {args.worst} pairs by content-only ratio:")
    all_scored.sort(key=lambda s: -s[0])
    for c, f, j, a, b, cohort in all_scored[: args.worst]:
        print(f"  {c:.3f} content | {f:.3f} full | {j:.3f} jac  [{cohort}]")
        print(f"      /{a.route}/  vs  /{b.route}/")

    print()
    print("targets: content < 0.45, jaccard < 0.40")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
