# Content-differentiation baseline

Recorded at Phase 0 of the full-rollout content work, before any deep-content changes.
Every later phase is measured against these numbers.

Reproduce with:

```
npm run build
python3 scripts/similarity.py --pairs 40 --worst 8
```

## Baseline — 2026-08-18, commit `fe11faa`

Build: 4,030 pages + `404.html`. `dist/` 332 MB (~84 KB/page).

```
pages analysed:        3948
unique words/page:     min 173  median 182  max 434

cohort                       pairs     full   content   jaccard
--------------------------------------------------------------
same-language-same-state        40    0.974     0.835     0.617
same-pair-diff-service          40    0.982     0.893     0.696
same-city-diff-language         40    0.978     0.849     0.692
```

Worst observed pair: `/mysore/french/translator/` vs `/bangalore/french/translator/`
— 0.988 content, 0.998 full.

### Reading these numbers

- **`content` is the number that matters.** `full` includes the ~1,176 words of
  header/mobile-menu/footer chrome that appear on every page and is therefore
  pinned near 0.98 regardless of how good the page content gets.
- The `content` figure here still includes `ServicesGrid` (108 identical words on
  every page). It is counted as content, not chrome, deliberately — it is in scope
  for improvement, and stripping it would hide that opportunity. Median 182 unique
  words is therefore ~74 words of genuinely page-specific text plus the grid.
- `jaccard` is order-invariant 5-gram overlap. It exists so that reordering
  sections — which would lower the difflib ratio without making pages any less
  duplicative — shows no improvement here.

## Targets

| Metric | Baseline (worst cohort) | Target |
|---|---|---|
| content-only ratio | 0.893 | **< 0.45** |
| 5-gram Jaccard | 0.696 | **< 0.40** |
| unique words/page | 182 median | **1,050–1,600** |

`same-language-same-state` is the cohort to watch: those pages share archetype,
state authorities and script notes, so it has the highest floor of the three and
will be the last to come down.

## URL baseline

`scripts/expected-urls.txt` regenerated at Phase 0: **1,394 → 4,030 URLs**, full
parity with `dist/sitemap.xml`. It had been stale since the city-coverage
expansion, which meant the verification gate in CLAUDE.md was passing vacuously —
every listed URL existed, while 2,636 built URLs went unchecked.
