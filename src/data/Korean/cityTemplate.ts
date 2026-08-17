import type { City } from "@/content/cities";
import type { Language } from "@/content/languages";
import type { ServiceMeta } from "@/content/services";
import { buildPageFacts, type PageContent } from "@/content/pageTemplates";

interface Ctx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

// Pilot for the full-rollout content-depth work: city data now exists for all 72 cities
// (src/content/cities.ts), but this template only weaves it in for the pilot cities until
// Phase 5 deliberately rolls deep content out everywhere with its own observation window.
// Remove this gate at that point — buildPageFacts already degrades gracefully either way.
// Kept in sync with resolveContent.ts's PILOT_CITIES (Phase 3 widened this to 6 cities).
const FACTS_ENABLED_CITIES = new Set(["pune", "surat", "bangalore", "ludhiana", "kochi", "coimbatore"]);

// Weaves in real per-city facts (via buildPageFacts) for the pilot cities — for every other
// city, industryClause stays empty and the copy is byte-identical to before Phase 1.
const translator = (ctx: Ctx): PageContent => {
  const { city, language, service } = ctx;
  const facts = buildPageFacts(ctx);
  const industryClause =
    facts.industry && FACTS_ENABLED_CITIES.has(city.slug) ? `, especially for ${city.name}'s ${facts.industry} sector` : "";
  return {
    heading: `${language.name} ${service.label} in ${city.name} — Business & Legal Specialists`,
    subHeading: `Triasia Global's ${language.name} translators in ${city.name} specialize in business contracts, technical manuals, and legal documents for companies expanding between Korea and ${city.state}${industryClause}. Certified, accurate, and fast.`,
  };
};

const interpreter = (ctx: Ctx): PageContent => {
  const { city, language, service } = ctx;
  const facts = buildPageFacts(ctx);
  const industryClause =
    facts.industry && FACTS_ENABLED_CITIES.has(city.slug) ? `, a natural fit for ${city.name}'s ${facts.industry} businesses` : "";
  return {
    heading: `${language.name} ${service.label} for Meetings & Conferences in ${city.name}`,
    subHeading: `Our ${language.name} interpreters support corporate meetings, factory visits, and conferences in ${city.name}, ${city.state}${industryClause}, ensuring smooth communication for Korean-Indian business collaborations.`,
  };
};

export default { translator, interpreter };
