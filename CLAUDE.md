# TriasiaGlobal — CLAUDE.md

Marketing site for TriasiaGlobal, a translation/interpretation agency in India, deployed at www.triasiaglobal.com via GitHub Pages. **Astro 5** static site (zero framework JS) + **Tailwind 4** (CSS-first `@theme` tokens). Static hosting on GitHub Pages is a deliberate choice to avoid hosting costs — solutions must stay static (no server, no API routes, no database). Migrated from Vite+React+react-snap in July 2026; do not reintroduce React or a prerenderer — Astro's `getStaticPaths` is the page-generation mechanism.

## Commands
- `npm run dev` — dev server (default port 4321)
- `npm run build` — `astro check && astro build && node scripts/update-lastmod.mjs` → `dist/` (968 pages in ~2s)
- `npm run preview` — serve the built `dist/`
- Deploy: **push to `main`** → `.github/workflows/deploy.yml` (withastro/action → actions/deploy-pages). No local deploy step. Repo Settings → Pages → Source must be "GitHub Actions"; custom domain lives in Settings (plus `public/CNAME` as belt-and-braces).

## Architecture: data-driven city × language × service pages

Fixed file-based route table (`src/pages/`) — adding a city/language/category never touches routing:

| File | URL | Notes |
|---|---|---|
| `index.astro` | `/` | homepage |
| `locations/index.astro` | `/locations/` | all cities |
| `locations/[city].astro` | `/locations/:city/` | per-city language/service links |
| `services/[category].astro` | `/services/:category/` | 6 document-type landing pages |
| `[language]/[service].astro` | `/:language/:service/` | national hub page |
| `[city]/[language]/[service].astro` | `/:city/:language/:service/` | city page |
| `404.astro` | `404.html` | GH Pages native 404, `noindex` |
| `sitemap.xml.ts` | `/sitemap.xml` | static endpoint, NOT @astrojs/sitemap (keeps stable URL); emits `<lastmod>` from `src/content/lastmod.json` |

### Sitemap `lastmod` (`src/content/lastmod.json`)
`<lastmod>` is per-URL and **honest by construction**: a page's date moves only when *that page's own content* changes. Google stops trusting the field for a whole domain once it looks like a blanket "today" stamp, so this is load-bearing, not cosmetic.

`scripts/update-lastmod.mjs` runs as the last step of `npm run build`. It hashes each built page's **title + meta description + slot content**, deliberately excluding header, mobile menu and footer — so a nav or footer tweak doesn't falsely bump all 968 URLs. Unchanged hash → keep the stored date. Changed hash → today. Never-seen page → seeded from `git log` on the files that actually produce its content (override → per-language `cityTemplate.ts` → per-language hub file → `defaultTranslatorContent.ts` / `pageTemplates.ts`), mirroring `resolveContent.ts`.

**`src/content/lastmod.json` must be committed.** Under `CI=true` the script never writes and instead *fails the build* if the manifest is stale — because CI can't commit it back, a stale manifest would re-stamp the same pages with a fresh date on every deploy, which is exactly the pattern that gets `lastmod` ignored. If a deploy fails with "lastmod: ... is stale", run `npm run build` locally and commit the manifest.

Every dynamic page's `getStaticPaths` pulls from **`src/content/routes.ts`** (`hubPairs()`, `cityLanguagePairs()`, `getAllRoutePaths()`), and `sitemap.xml.ts` uses the same `getAllRoutePaths()` — sitemap↔pages parity holds by construction. Unknown slugs simply have no generated page → GH Pages serves `404.html` (there is no runtime slug validation anymore).

**Trailing slashes everywhere**: `trailingSlash: 'always'` + `build.format: 'directory'` in `astro.config.mjs`, because GH Pages 301s directory URLs to the slash form. All internal links, canonicals (`seo.ts` appends it), and sitemap entries use `/path/` form.

### Content data layer (`src/content/`)
- `cities.ts` / `languages.ts` / `services.ts` — single source of truth. **Adding a city or language = one entry here; everything else (pages, nav, footer, sitemap) follows automatically**, with auto-generated default copy.
- `serviceCategories.ts` — 6 document-type categories, hand-written copy, `icon` is an Iconify name string (e.g. `"lucide:scale"`) rendered via astro-icon.
- `business.ts` — contact/address/siteUrl, reused by header, footer, and JSON-LD.
- `resolveContent.ts` — page copy resolution, most specific wins: (a) exact override `src/content/overrides/<city>/<lang>/<service>.ts` → (b) per-language `src/data/<Language>/cityTemplate.ts` → (c) global default templates in `pageTemplates.ts` (rotating sentence variants, hash-picked). Hub pages (no city) use `src/data/<Language>/{translator,interpreter}.ts` if present, else the default template. Overrides/templates are auto-discovered via `import.meta.glob` (works in Astro; Vite-based) — no registry to edit.
- `seo.ts` — builds title/description/canonical/JSON-LD from the same resolved content. Consumed as props by `BaseLayout.astro`.
- Reserved slugs: `"locations"` and `"services"` are guarded in the data files — with file-based routing a colliding city/language slug would be **silently shadowed** by the static dirs, so the guards throw at build time.

### Layout & design system
- `src/layouts/BaseLayout.astro` — the only `<head>` (title/description/canonical/OG/JSON-LD/gtag/favicons/fonts). The Google tag (AW-17509916224) and JSON-LD scripts **must stay `is:inline`** or Astro bundles/mangles them.
- `src/styles/global.css` — Tailwind 4 `@theme` tokens: navy (`navy-950/900/800/700/100`) + brass (`brass-500/300`) palette, `ink-900/600` text, `surface-0/1` section backgrounds, `line` borders; Fraunces Variable for display headings (h1/h2), Inter Variable body — both self-hosted via @fontsource. Component classes: `.container-site`, `.eyebrow`, `.card`/`.card-hover`, `.btn-primary`/`.btn-secondary`/`.btn-brass` (brass is the on-dark primary).
- Components (`src/components/*.astro`): Header (sticky, CSS-only Languages **and** Cities mega-menu dropdowns — Cities lists every `cities.ts` entry linking to `/locations/:city/` plus a "View all cities" link, mirrored in the mobile `<details>` accordion — mobile menu), Footer (navy; links **every** category, language×service, and city — this internal-link mesh is deliberate SEO, preserve it), Hero, ServicesGrid (heading/subHeading/headingLevel props — h1 on the homepage-style use is handled by pages), ServiceHero (h1 band on all service pages), LanguagesSection (display-only marketing badges, intentionally not wired to routing data), WhyChooseUs.
- **Gotcha (learned the hard way)**: the mobile menu panel lives *outside* `<header>` as a sibling because the header's `backdrop-blur` (backdrop-filter) creates a containing block for `position: fixed` descendants — inside it, the panel computes to zero height. Don't move it back in.
- Interactivity is one small `is:inline` script in Header.astro (menu toggle + Escape + link-click close). No framework JS anywhere; keep it that way.
- One `<h1>` per page (Hero on `/`, ServiceHero or page heading elsewhere).

### Adding content
- **City/language**: one entry in `cities.ts`/`languages.ts`. Optional real copy: `src/data/<Language>/{translator,interpreter}.ts` (hub) / `cityTemplate.ts` (all city pages) / `src/content/overrides/...` (one combo).
- **Service category**: one entry in `serviceCategories.ts` (use a `lucide:*` Iconify name — a typo fails the build, which is good).

## Verification after changes
`npm run build` (this also refreshes `src/content/lastmod.json` — commit it), then: `scripts/expected-urls.txt` holds the URL baseline — every path there must exist as `dist/<path>/index.html` and match `dist/sitemap.xml`'s `<loc>` set (update the baseline deliberately when adding content). Spot-check raw dist HTML for unique `<title>`, one `<meta name="description">`, trailing-slash canonical, JSON-LD on service pages, gtag present, exactly one `<h1>`. `puppeteer-core` (devDep) + system Chrome is available for browser checks (`executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`); note plain `--headless --window-size=375,...` screenshots without mobile emulation render misleadingly — use puppeteer's `setViewport({ isMobile: true })`.

## History note
The pre-Astro stack (Vite+React+react-snap+react-helmet-async) had: abandoned react-snap needing system Chrome, a Helmet race corrupting ~20% of prerendered titles (forced `concurrency: 1`), minutes-long builds, and a full React bundle for static content. All gone — don't bring back workarounds referencing it. That stack is preserved as-is on the `oldDesign` branch (renamed from the old `main`) purely as a reference/rollback snapshot — don't merge from it or resurrect its patterns.
