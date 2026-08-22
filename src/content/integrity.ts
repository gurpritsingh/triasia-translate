// Cross-file referential checks that no single file's own validator can catch — a typo in
// a documentFocus slug or a stateSlug would otherwise silently resolve to `undefined` deep
// inside the content engine instead of failing the build where the typo actually is.
import { cities } from "./cities";
import { languages } from "./languages";
import { statesBySlug } from "./states";
import { serviceCategoriesBySlug } from "./serviceCategories";

function assertIntegrity(): void {
  const errors: string[] = [];

  for (const city of cities) {
    if (!statesBySlug[city.stateSlug]) {
      errors.push(`city "${city.slug}": stateSlug "${city.stateSlug}" has no entry in states.ts`);
    }
    for (const slug of city.documentFocus) {
      if (!serviceCategoriesBySlug[slug]) {
        errors.push(`city "${city.slug}": documentFocus references unknown category "${slug}"`);
      }
    }
  }

  for (const language of languages) {
    for (const slug of language.documentFocus) {
      if (!serviceCategoriesBySlug[slug]) {
        errors.push(`language "${language.slug}": documentFocus references unknown category "${slug}"`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Cross-file data integrity errors — ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  }
}

assertIntegrity();
