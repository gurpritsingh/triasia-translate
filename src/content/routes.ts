// Single source of truth for every concrete route on the site.
// Consumed by each page's getStaticPaths AND by src/pages/sitemap.xml.ts,
// so the sitemap and the generated pages can never drift apart.
import { cities, type City } from "./cities";
import { languages, type Language } from "./languages";
import { services, type ServiceMeta } from "./services";
import { serviceCategories } from "./serviceCategories";

export interface CityLanguageService {
  city: City;
  language: Language;
  service: ServiceMeta;
}

export interface LanguageService {
  language: Language;
  service: ServiceMeta;
}

export function hubPairs(): LanguageService[] {
  return languages.flatMap((language) => services.map((service) => ({ language, service })));
}

export function cityLanguagePairs(): CityLanguageService[] {
  return cities.flatMap((city) =>
    languages
      .filter((language) => !city.languages || city.languages.includes(language.slug))
      .flatMap((language) => services.map((service) => ({ city, language, service })))
  );
}

/**
 * Canonical URLs only — what the sitemap advertises. Alias cities still have
 * pages built (see cityLanguagePairs), but a sitemap should never list a URL
 * that canonicalises elsewhere, so they are filtered out here.
 */
export function getAllRoutePaths(): string[] {
  const canonicalCities = cities.filter((city) => !city.aliasOf);
  return [
    "/",
    "/locations/",
    ...canonicalCities.map((city) => `/locations/${city.slug}/`),
    ...serviceCategories.map((category) => `/services/${category.slug}/`),
    ...hubPairs().map(({ language, service }) => `/${language.slug}/${service.slug}/`),
    ...cityLanguagePairs()
      .filter(({ city }) => !city.aliasOf)
      .map(({ city, language, service }) => `/${city.slug}/${language.slug}/${service.slug}/`),
  ];
}
