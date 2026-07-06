// Static sitemap endpoint at the stable URL /sitemap.xml (referenced from
// robots.txt and Search Console). Uses the same route computation as every
// page's getStaticPaths, so the sitemap and generated pages can't drift.
import type { APIRoute } from "astro";
import { getAllRoutePaths } from "@/content/routes";
import { business } from "@/content/business";

export const GET: APIRoute = () => {
  const urls = getAllRoutePaths()
    .map((path) => `  <url><loc>${business.siteUrl}${path}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
