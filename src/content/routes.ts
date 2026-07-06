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

export function getAllRoutePaths(): string[] {
  return [
    "/",
    "/locations/",
    ...cities.map((city) => `/locations/${city.slug}/`),
    ...serviceCategories.map((category) => `/services/${category.slug}/`),
    ...hubPairs().map(({ language, service }) => `/${language.slug}/${service.slug}/`),
    ...cityLanguagePairs().map(
      ({ city, language, service }) => `/${city.slug}/${language.slug}/${service.slug}/`
    ),
  ];
}
