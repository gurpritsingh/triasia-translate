// Single source of truth for every concrete route on the site.
// Consumed by each page's getStaticPaths AND by src/pages/sitemap.xml.ts,
// so the sitemap and the generated pages can never drift apart.
import { cities, type City } from "./cities";
import { languages, type Language } from "./languages";
import { services, type ServiceMeta } from "./services";
import { serviceCategories } from "./serviceCategories";
import "./integrity";

export interface CityLanguageService {
  city: City;
  language: Language;
  service: ServiceMeta;
}

export interface LanguageService {
  language: Language;
  service: ServiceMeta;
}

// Phase 6: the "translation" (paperwork/government/real-estate) service now generates for
// every city/language — the 108-page cohort (6 cities x 6 languages) validated it across all
// three pair archetypes with zero unexpected regressions. Kept as a function (not an inline
// `services` reference) so Header/Footer nav and route generation stay driven by one place if
// a future service ever needs its own gate again.
export function servicesForLanguage(_language: Language, _city?: City): ServiceMeta[] {
  return services;
}

export function hubPairs(): LanguageService[] {
  return languages.flatMap((language) => servicesForLanguage(language).map((service) => ({ language, service })));
}

export function cityLanguagePairs(): CityLanguageService[] {
  return cities.flatMap((city) =>
    languages
      .filter((language) => !city.languages || city.languages.includes(language.slug))
      .flatMap((language) => servicesForLanguage(language, city).map((service) => ({ city, language, service })))
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
