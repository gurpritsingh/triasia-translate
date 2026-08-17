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

// Pilot for the new "translation" (paperwork/government/real-estate) service — only these
// city/language pairs get it while the offering is being validated. Same cohort as the
// content-differentiation pilot. Remove this gate when rolling out to every city/language.
const TRANSLATION_PILOT_CITIES = new Set(["pune", "surat"]);
const TRANSLATION_PILOT_LANGUAGES = new Set(["korean", "punjabi"]);

// Filters the global service list down to what should actually exist for a given
// language (and, for city pages, a given city) — used by both route generation below
// and by Header/Footer nav, so a service is never linked to without a page to land on.
export function servicesForLanguage(language: Language, city?: City): ServiceMeta[] {
  return services.filter((service) => {
    if (service.slug !== "translation") return true;
    if (!TRANSLATION_PILOT_LANGUAGES.has(language.slug)) return false;
    return !city || TRANSLATION_PILOT_CITIES.has(city.slug);
  });
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
