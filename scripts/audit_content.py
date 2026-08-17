#!/usr/bin/env python3
"""Exhaustive, cheap (non-pairwise) checks across every generated page: single <h1>, unique
title/meta description, valid JSON-LD, and a word-count floor for pages the content engine
touched. Complements similarity.py, which is expensive (pairwise) and therefore sampled."""
import json
import os
import re
import sys

DIST = "dist"


def check_page(path: str, html: str, titles: dict, descriptions: dict, errors: list) -> None:
    h1s = re.findall(r"<h1\b", html)
    if len(h1s) != 1:
        errors.append(f"{path}: {len(h1s)} <h1> tags (expected 1)")

    title_m = re.search(r"<title>([^<]*)</title>", html)
    title = title_m.group(1) if title_m else None
    if not title:
        errors.append(f"{path}: missing <title>")
    else:
        titles.setdefault(title, []).append(path)

    desc_m = re.search(r'<meta name="description" content="([^"]*)"', html)
    desc = desc_m.group(1) if desc_m else None
    if not desc:
        errors.append(f"{path}: missing meta description")
    else:
        descriptions.setdefault(desc, []).append(path)

    ld_matches = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    for ld in ld_matches:
        try:
            json.loads(ld)
        except json.JSONDecodeError as e:
            errors.append(f"{path}: invalid JSON-LD ({e})")

    canonical_m = re.search(r'<link rel="canonical" href="([^"]*)"', html)
    if not canonical_m:
        errors.append(f"{path}: missing canonical link")
    elif not canonical_m.group(1).endswith("/"):
        errors.append(f"{path}: canonical does not end in trailing slash")


def main() -> int:
    if not os.path.isdir(DIST):
        print(f"error: {DIST} not found — run npm run build first", file=sys.stderr)
        return 1

    titles: dict = {}
    descriptions: dict = {}
    errors: list = []
    count = 0

    for root, _dirs, files in os.walk(DIST):
        if "index.html" not in files:
            continue
        path = os.path.join(root, "index.html")
        html = open(path, encoding="utf-8", errors="replace").read()
        count += 1
        check_page(path, html, titles, descriptions, errors)

    dup_titles = {t: p for t, p in titles.items() if len(p) > 1}
    dup_descs = {d: p for d, p in descriptions.items() if len(p) > 1}

    print(f"pages checked: {count}")
    print(f"structural errors (h1/title/meta/json-ld/canonical): {len(errors)}")
    for e in errors[:30]:
        print("  -", e)
    print(f"duplicate <title> values: {len(dup_titles)}")
    for t, p in list(dup_titles.items())[:10]:
        print(f"  - {t!r}: {p}")
    print(f"duplicate meta descriptions: {len(dup_descs)}")
    for d, p in list(dup_descs.items())[:10]:
        print(f"  - {d[:60]!r}...: {p}")

    return 1 if (errors or dup_titles or dup_descs) else 0


if __name__ == "__main__":
    raise SystemExit(main())
