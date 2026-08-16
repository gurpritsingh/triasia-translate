import type { City } from "@/content/cities";
import type { Language } from "@/content/languages";
import type { ServiceMeta } from "@/content/services";
import { buildPageFacts, type PageContent } from "@/content/pageTemplates";

interface Ctx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

// Weaves in real per-city facts (via buildPageFacts) where available — for cities without
// industry data, facts.industry is undefined and the copy is byte-identical to before.
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
