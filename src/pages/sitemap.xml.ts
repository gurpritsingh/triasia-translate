// Static sitemap endpoint at the stable URL /sitemap.xml (referenced from
// robots.txt and Search Console). Uses the same route computation as every
// page's getStaticPaths, so the sitemap and generated pages can't drift.
import type { APIRoute } from "astro";
import { getAllRoutePaths } from "@/content/routes";
import { business } from "@/content/business";
import lastmod from "@/content/lastmod.json";

// <lastmod> comes from src/content/lastmod.json, maintained by
// scripts/update-lastmod.mjs — a page's date moves only when that page's own
// content changes. Stamping every URL with today's date on every deploy is the
// fastest way to make Google distrust the field for the whole domain, so a path
// with no honest date recorded yet simply omits the tag.
const dates = lastmod as Record<string, { h: string; d: string }>;

export const GET: APIRoute = () => {
  const urls = getAllRoutePaths()
    .map((path) => {
      const entry = dates[path];
      const stamp = entry ? `<lastmod>${entry.d}</lastmod>` : "";
      return `  <url><loc>${business.siteUrl}${path}</loc>${stamp}</url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
