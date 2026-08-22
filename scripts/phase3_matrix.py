#!/usr/bin/env python3
"""Full pairwise similarity matrix over the Phase 3 108-page stratified cohort
(6 cities x 6 languages x 3 services), content-only (header/footer/mobile-menu stripped).
Reports the distribution and worst offenders, split out by pair type."""
import itertools
import re

CITIES = ["pune", "surat", "bangalore", "ludhiana", "kochi", "coimbatore"]
LANGS = ["korean", "punjabi", "kannad", "tamil", "german", "arabic"]
SERVICES = ["translator", "interpreter", "translation"]

BOILERPLATE = [
    re.compile(r"<header\b.*?</header>", re.S),
    re.compile(r'<div id="mobile-menu".*?(?=<section\b|<footer\b)', re.S),
    re.compile(r"<footer\b.*?</footer>", re.S),
]


def content_text(html: str) -> str:
    for pat in BOILERPLATE:
        html = pat.sub(" ", html)
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", html).strip()


def ratio(a: str, b: str) -> float:
    import difflib

    return difflib.SequenceMatcher(None, a, b).ratio()


pages = {}
for c, l, s in itertools.product(CITIES, LANGS, SERVICES):
    path = f"dist/{c}/{l}/{s}/index.html"
    try:
        pages[(c, l, s)] = content_text(open(path).read())
    except FileNotFoundError:
        print(f"MISSING: {path}")

print(f"loaded {len(pages)} / {len(CITIES)*len(LANGS)*len(SERVICES)} pages")

keys = list(pages.keys())
buckets = {"same-city-diff-lang": [], "same-lang-diff-city": [], "same-pair-diff-service": [], "unrelated": []}

for i in range(len(keys)):
    for j in range(i + 1, len(keys)):
        (c1, l1, s1), (c2, l2, s2) = keys[i], keys[j]
        r = ratio(pages[keys[i]], pages[keys[j]])
        if c1 == c2 and l1 == l2:
            buckets["same-pair-diff-service"].append((r, keys[i], keys[j]))
        elif c1 == c2 and s1 == s2:
            buckets["same-city-diff-lang"].append((r, keys[i], keys[j]))
        elif l1 == l2 and s1 == s2:
            buckets["same-lang-diff-city"].append((r, keys[i], keys[j]))
        else:
            buckets["unrelated"].append((r, keys[i], keys[j]))

print()
print(f"{'bucket':<26}{'pairs':>7}{'mean':>8}{'max':>8}")
for name, items in buckets.items():
    if not items:
        continue
    vals = [r for r, _, _ in items]
    print(f"{name:<26}{len(items):>7}{sum(vals)/len(vals):>8.3f}{max(vals):>8.3f}")

print()
print("worst 15 overall:")
all_pairs = sorted((r, a, b, bucket) for bucket, items in buckets.items() for r, a, b in items for _ in [0])
# rebuild with bucket labels properly
all_pairs = []
for bucket, items in buckets.items():
    for r, a, b in items:
        all_pairs.append((r, a, b, bucket))
all_pairs.sort(key=lambda x: -x[0])
for r, a, b, bucket in all_pairs[:15]:
    print(f"  {r:.3f}  [{bucket}]  {'/'.join(a)}  vs  {'/'.join(b)}")
