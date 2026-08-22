import type { City } from "@/content/cities";
import type { Language } from "@/content/languages";
import type { ServiceMeta } from "@/content/services";
import { buildPageFacts, type PageContent } from "@/content/pageTemplates";

interface Ctx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

// Phase 5: every city now has real industries data (src/content/cities.ts), so this weaves
// in facts.industry for all of them rather than a narrow pilot subset.
const translator = (ctx: Ctx): PageContent => {
  const { city, language, service } = ctx;
  const facts = buildPageFacts(ctx);
  const industryClause = facts.industry ? `, especially for ${city.name}'s ${facts.industry} sector` : "";
  return {
    heading: `${language.name} ${service.label} in ${city.name} — Business & Legal Specialists`,
    subHeading: `Triasia Global's ${language.name} translators in ${city.name} specialize in business contracts, technical manuals, and legal documents for companies expanding between Korea and ${city.state}${industryClause}. Certified, accurate, and fast.`,
  };
};

const interpreter = (ctx: Ctx): PageContent => {
  const { city, language, service } = ctx;
  const facts = buildPageFacts(ctx);
  const industryClause = facts.industry ? `, a natural fit for ${city.name}'s ${facts.industry} businesses` : "";
  return {
    heading: `${language.name} ${service.label} for Meetings & Conferences in ${city.name}`,
    subHeading: `Our ${language.name} interpreters support corporate meetings, factory visits, and conferences in ${city.name}, ${city.state}${industryClause}, ensuring smooth communication for Korean-Indian business collaborations.`,
  };
};

export default { translator, interpreter };
