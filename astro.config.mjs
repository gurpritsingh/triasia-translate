import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://www.triasiaglobal.com",
  // GitHub Pages 301s directory URLs to the trailing-slash form, so emit
  // trailing-slash URLs everywhere (links, canonicals, sitemap) to match.
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
