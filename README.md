# TriasiaGlobal

Marketing site for [www.triasiaglobal.com](https://www.triasiaglobal.com) — Astro 5 + Tailwind 4, fully static, hosted free on GitHub Pages.

## Develop

```sh
npm install
npm run dev        # dev server at localhost:4321
npm run build      # astro check + build -> dist/
npm run preview    # serve the built dist/
```

## Deploy

Push to `main` — `.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically. No local deploy step.

## Adding content

- **New city or language**: add one entry to `src/content/cities.ts` or `src/content/languages.ts`. All pages, nav (including the header's Languages/Cities dropdowns), footer links, and the sitemap update automatically with generated default copy.
- **Custom copy**: `src/data/<Language>/{translator,interpreter}.ts` (national hub page), `src/data/<Language>/cityTemplate.ts` (all of that language's city pages), or `src/content/overrides/<city>/<language>/<service>.ts` (one specific page).
- **New service category**: add an entry to `src/content/serviceCategories.ts`.

See `CLAUDE.md` for architecture details.
