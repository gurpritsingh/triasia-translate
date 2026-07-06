// Runs before `vite build` (see package.json "prebuild"). Computes the full list of
// concrete URLs from the content data files and uses it to:
//   1. write public/sitemap.xml (copied into dist/ verbatim by vite build)
//   2. populate package.json's reactSnap.include so react-snap prerenders every route
// This replaces the old pageCreator.js codegen step, which doesn't apply here since
// routes are now data-driven rather than one physical page per language.
import fs from "node:fs";
import path from "node:path";
import { cities } from "../src/content/cities";
import { languages } from "../src/content/languages";
import { services } from "../src/content/services";
import { serviceCategories } from "../src/content/serviceCategories";
import { business } from "../src/content/business";

const rootDir = process.cwd();

function getAllRoutePaths(): string[] {
  const routes: string[] = ["/", "/locations"];

  for (const city of cities) {
    routes.push(`/locations/${city.slug}`);
  }

  for (const category of serviceCategories) {
    routes.push(`/services/${category.slug}`);
  }

  for (const language of languages) {
    for (const service of services) {
      routes.push(`/${language.slug}/${service.slug}`);
    }
  }

  for (const city of cities) {
    const cityLanguages = languages.filter((language) => !city.languages || city.languages.includes(language.slug));
    for (const language of cityLanguages) {
      for (const service of services) {
        routes.push(`/${city.slug}/${language.slug}/${service.slug}`);
      }
    }
  }

  return routes;
}

function writeSitemap(routes: string[]) {
  const urls = routes.map((route) => `  <url><loc>${business.siteUrl}${route}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), xml, "utf-8");
  console.log(`✅ Wrote public/sitemap.xml with ${routes.length} URLs`);
}

function updateReactSnapInclude(routes: string[]) {
  const pkgPath = path.join(rootDir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.reactSnap = pkg.reactSnap ?? {};
  pkg.reactSnap.include = routes;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
  console.log(`✅ Updated package.json reactSnap.include with ${routes.length} routes`);
}

const routes = getAllRoutePaths();
writeSitemap(routes);
updateReactSnapInclude(routes);
