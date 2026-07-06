# TriasiaGlobal — CLAUDE.md

Marketing site for TriasiaGlobal, a translation/interpretation agency in India (deployed at www.triasiaglobal.com via GitHub Pages, see `CNAME`). Vite + React 18 + TypeScript SPA using shadcn/ui + Tailwind. Originally scaffolded via Lovable.dev. Static hosting on GitHub Pages is a deliberate choice to avoid hosting costs — solutions must stay static (no server, no API routes, no database).

## Commands
- `npm run dev` — start dev server (port 8080)
- `npm run build` — runs `prebuild` (regenerates `public/sitemap.xml` + `reactSnap.include`), then `vite build`, copies `CNAME` into `dist/`, then `postbuild` (`react-snap` prerenders every route)
- `npm run lint` — eslint
- `npm run deploy` — publishes `dist/` to GitHub Pages via `gh-pages`
- Note: `npm install` needs `--legacy-peer-deps` — `@vitejs/plugin-legacy@^7` declares a peer on vite `^7` while the project pins vite `^5.4.19` (pre-existing, unrelated to app code). `react-snap`'s bundled Puppeteer Chromium isn't downloadable in some sandboxes; if `npm run build` hangs on the `postbuild` step, run with `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run build` (adjust path per OS) to use a system Chrome instead.

## Architecture: data-driven city × language × service pages

Pages are generated from data at **route + render time**, not as physical files. There is a fixed, small route table in `src/App.tsx` that never needs editing when a city/language/content is added:

| Route | Component |
|---|---|
| `/` | `Index.tsx` |
| `/locations` | `LocationsIndexPage.tsx` — browsable list of all cities |
| `/locations/:citySlug` | `CityIndexPage.tsx` — languages/services available in that city |
| `/:languageSlug/:serviceSlug` | `ServicePage.tsx` — national hub page (no city) |
| `/:citySlug/:languageSlug/:serviceSlug` | `ServicePage.tsx` (same component, city-specific) |
| `/services/:categorySlug` | `ServiceCategoryPage.tsx` — standalone document-type landing page |
| `*` | `NotFound.tsx` |

`ServicePage.tsx` validates slugs against the data layer and renders `<NotFound />` directly on any unknown city/language/service combo. Same pattern in `ServiceCategoryPage.tsx` for unknown category slugs.

`/services/:categorySlug` is a **standalone** dimension (not crossed with language/city, by deliberate scope decision) — 6 document-type pages (legal, educational, medical, technical, business, personal), content in `src/content/serviceCategories.ts` with hand-written copy per category (not templated, since there are only 6 and they're well-known). `"services"` is a reserved slug (alongside `"locations"`) guarded in `languages.ts`/`cities.ts` so a language/city can never collide with this route namespace.

### Content data layer (`src/content/`)
- `cities.ts` / `languages.ts` / `services.ts` — the single source of truth for what cities/languages/services exist (slug, display name, state, etc). Adding a city or language is just adding an entry here — no other file needs touching.
- `business.ts` — centralized contact/address info, reused by `Footer.tsx`, `Header.tsx`, and JSON-LD.
- `resolveContent.ts` — resolves page copy (`heading`/`subHeading`) for a given `(city?, language, service)` in priority order:
  1. **Exact override** — drop a file at `src/content/overrides/<city>/<language>/<service>.ts` (auto-discovered via `import.meta.glob`, no registry to edit).
  2. **Language-level city template** — optional `src/data/<Language>/cityTemplate.ts` exporting `{ translator?, interpreter? }` functions that get `{city, language, service}` and return interpolated copy for *all* of that language's city pages.
  3. **Global default template** (`pageTemplates.ts`) — always defined, several rotating sentence-structure variants (chosen deterministically by hashing `city/language/service`) so auto-generated pages aren't identical/thin content across cities.
  - National hub pages (no city) use `src/data/<Language>/{translator,interpreter}.ts` **if present** (the 4 original languages have hand-written copy there), otherwise fall back to `defaultCityContent({ language, service })` (no `src/data/` files required at all) — so a brand-new language added to `languages.ts` gets a working, auto-generated hub page with zero other files needed.
- `seo.ts` — derives `<title>`/description/canonical/JSON-LD from the *same* resolved content object (not a parallel copy).

### SEO (`src/components/Seo.tsx` + `react-helmet-async`)
Every route renders `<Seo>` (wrapped in `<HelmetProvider>` in `App.tsx`). `index.html` only has fallback/static tags (title, gtag, favicon) — do not add `<meta name="description">` or OG tags back to `index.html`; they'd sit alongside Helmet's per-page tags as duplicates rather than being replaced (Helmet only manages tags it renders itself, not ones already static in the HTML).

### Build-time SEO artifacts (`scripts/generateSeoArtifacts.ts`)
Runs via the `prebuild` npm script (before `vite build`). Reads `src/content/{cities,languages,services}.ts`, computes every concrete route, and:
1. Writes `public/sitemap.xml` (gitignored — regenerated every build; don't hand-edit or commit it).
2. Rewrites `package.json`'s `reactSnap.include` array via a JSON round-trip (not a regex) so `react-snap` prerenders every route.

### react-snap config gotchas (`package.json` → `reactSnap`)
- **`concurrency: 1` is required, not optional.** Under the default `concurrency: 4`, `react-helmet-async`'s title/meta commit races react-snap's Puppeteer capture for a meaningful fraction of pages (~20% observed) — they get captured with `index.html`'s static fallback title instead of the per-page one. `waitFor: 300` alone does not fix this; only serializing the crawl does. Don't raise concurrency without re-auditing prerendered titles across all pages first (see verification below).
- `/404.html` is prerendered automatically by react-snap itself (`src/puppeteer_utils.js` unconditionally queues it once 2+ routes are queued) — this is react-snap's built-in GitHub Pages 404 support. **Don't add a manual `public/404.html` redirect-trick file** — it just gets silently overwritten by react-snap's own render of the app's `NotFound` page, which is already correct and simpler.
- `removeScriptTags` (not `removeScripts`, which isn't a real option) must stay unset/`false` — it strips *every* `<script>` tag with no allowlist, deleting both the hydration bundle and the JSON-LD block.

### Adding a new city or language
1. City: add an entry to `src/content/cities.ts`. Language: add an entry to `src/content/languages.ts`. **That alone is enough** — hub page, all city-crossed pages, nav, footer, sitemap, and `reactSnap.include` all work immediately with auto-generated default content.
2. Optionally add real hand-written copy: `src/data/<Language>/{translator,interpreter}.ts` for the hub page, and/or override/template content per §"Content data layer" above for city pages — otherwise the default template covers all of it.
3. `App.tsx`, `navigationConfig.ts`, `Footer.tsx`, sitemap, and `reactSnap.include` all update automatically — nothing else to touch. (The nav "Languages" dropdown is intentionally language-only, not nested by city — city pages are discovered via `/locations`.)

### Adding a new service category
Add an entry to `src/content/serviceCategories.ts` (slug, title, heading, subHeading, details list, icon, colors) — `ServicesSection.tsx` cards, `Footer.tsx`'s "Our Services" list, the `/services/:categorySlug` route, and the sitemap all pick it up automatically.

### Footer as an internal-linking "sitemap"
`Footer.tsx` deliberately links every language (translator + interpreter), every city, and every service category — sourced live from `src/content/{languages,cities,serviceCategories}.ts`, not hardcoded. This is intentional for SEO (internal link discovery) and for keeping react-snap's organic crawl in sync with the generated sitemap/include list. When adding a new content dimension, make sure Footer links to it too.

### Verifying a build
After `npm run build`, spot-check: `grep -c "<url>" dist/sitemap.xml` should match `find dist -name index.html | wc -l`; grep a sample of `dist/**/index.html` for `<title>` to confirm no page still has the generic `index.html` fallback title (a sign the concurrency race above has regressed).

## Other components
- `src/components/ui/` — shadcn/ui primitives. Treat as generated; prefer composing over editing.
- `src/components/LanguagesSection.tsx` — homepage marketing badges (120+ languages, Korean/Chinese/Japanese/French/German specialization lists). Deliberately **not** wired to `src/content/languages.ts` — it lists languages with no dedicated routes (Tamil, Bengali, etc.) and is display-only copy, not routing data.
- `App.tsx` imports `Toaster`/`Sonner`/`TooltipProvider` but never renders them (pre-existing, unused — toasts/tooltips don't currently work anywhere in the app). Not fixed as part of unrelated work; flag before assuming toast/tooltip components work.

## Conventions
- Path alias `@` → `src/` (see `vite.config.ts`, `components.json`).
- Tailwind + shadcn conventions apply (`components.json`: style "default", baseColor "slate", cssVariables on, no prefix).
- Each rendered page should have exactly one `<h1>` (the page-specific heading, via `ServicesSection`'s `headingLevel="h1"` prop when used through `TranslatorTemplate`) — the site logo in `Header.tsx` is a `<p>`, not an `<h1>`, on purpose.
- No test suite currently exists in this repo.
