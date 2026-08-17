import type { City } from "../cities";

const MIN_INDUSTRY_PHRASE_LENGTH = 8;

/** Fails the build if any city record lacks the data the content engine needs to avoid
 *  falling back to thin, name-swapped copy. Reports every problem at once. */
export function assertCityFacts(cities: City[]): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const city of cities) {
    if (seen.has(city.slug)) errors.push(`duplicate city slug "${city.slug}"`);
    seen.add(city.slug);

    if (!city.industries || city.industries.length < 2) {
      errors.push(`${city.slug}: industries must have >= 2 entries (has ${city.industries?.length ?? 0})`);
    }
    if (city.industries?.some((i) => i.length < MIN_INDUSTRY_PHRASE_LENGTH)) {
      errors.push(`${city.slug}: an industries entry is too short to be meaningful`);
    }
    if (!city.economicNote?.trim()) {
      errors.push(`${city.slug}: economicNote is required`);
    }
    if (!city.documentFocus || city.documentFocus.length < 2) {
      errors.push(`${city.slug}: documentFocus must have >= 2 serviceCategories slugs`);
    }
    if (!city.cityTraits || city.cityTraits.length < 1) {
      errors.push(`${city.slug}: cityTraits must have >= 1 value`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`City data incomplete — ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  }
}
