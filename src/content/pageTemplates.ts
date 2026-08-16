import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import { serviceCategories, serviceCategoriesBySlug, type ServiceCategory } from "./serviceCategories";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  heading: string;
  subHeading: string;
  localRelevance?: { intro: string; points: string[] };
  faqs?: FaqItem[];
}

interface TemplateCtx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length];
}

function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * Real, per-page facts pulled from city/language data — the shared input for both the
 * enriched heading/subheading and the LocalRelevance block, so the two never contradict
 * each other. Everything here stays anchored on "which documents does this pair need
 * translated/interpreted", never standalone city or language trivia.
 */
export interface Facts {
  industry?: string;
  useCase: string;
  docCategories: ServiceCategory[];
  economicNote?: string;
  notableAreas?: string[];
}

export function buildPageFacts(ctx: { city?: City; language: Language; service: ServiceMeta }): Facts {
  const { city, language, service } = ctx;
  const key = `${city?.slug ?? "national"}/${language.slug}/${service.slug}`;

  const useCases = language.useCases ?? [`certified ${language.name} documentation for individuals and businesses in India`];
  const languageDocFocus = language.documentFocus ?? ["personal-documents", "business-documents"];
  const cityDocFocus = city?.documentFocus;

  const focusSlugs = cityDocFocus
    ? cityDocFocus.filter((slug) => languageDocFocus.includes(slug))
    : languageDocFocus;
  const resolvedSlugs = focusSlugs.length > 0 ? focusSlugs : languageDocFocus;

  const docCategories = resolvedSlugs
    .map((slug) => serviceCategoriesBySlug[slug])
    .filter((category): category is ServiceCategory => Boolean(category));

  return {
    industry: city?.industries ? pick(city.industries, `${key}:industry`) : undefined,
    useCase: pick(useCases, `${key}:usecase`),
    docCategories: docCategories.length > 0 ? docCategories : [serviceCategories[0]],
    economicNote: city?.economicNote,
    notableAreas: city?.notableAreas,
  };
}

/** Turns Facts into the LocalRelevance block — always framed as "documents/situations we
 *  handle here", with any industry/economic fact used only as the reason those documents
 *  come up, never as a standalone city profile. */
export function buildLocalRelevance(ctx: { city?: City; language: Language; service: ServiceMeta; facts: Facts }): {
  intro: string;
  points: string[];
} {
  const { city, language, service, facts } = ctx;
  const docTitles = facts.docCategories.map((category) => category.title.toLowerCase());
  const docList = joinWithAnd(docTitles);
  const industryClause = facts.industry && city ? `, given ${city.name}'s ${facts.industry} sector` : "";

  const intro = city
    ? `${language.name} ${service.noun} requests in ${city.name} most often involve ${docList}${industryClause}, driven by ${facts.useCase}.`
    : `${language.name} ${service.noun} across India most often involves ${docList}, driven by ${facts.useCase}.`;

  const points = [
    `Documents we handle most: ${docList}`,
    facts.industry && city
      ? `Frequently requested by ${city.name}'s ${facts.industry} businesses`
      : `Common use case: ${facts.useCase}`,
    facts.notableAreas && facts.notableAreas.length > 0 && city
      ? `Serving ${language.name} ${service.noun} clients across ${joinWithAnd(facts.notableAreas)} and the wider ${city.name} area`
      : `Government-authorized, certified ${language.name} ${service.noun} with fast turnaround`,
  ];

  return { intro, points };
}

/** Richer heading/subheading for pilot city/language pairs that have no hand-authored
 *  override or language template — still anchored on `${language} ${service}` in the
 *  heading, with facts woven in only as the reason that city/language pair needs it. */
export function buildEnrichedContent(ctx: { city: City; language: Language; service: ServiceMeta }): PageContent {
  const { city, language, service } = ctx;
  const facts = buildPageFacts(ctx);
  const docTitles = facts.docCategories.map((category) => category.title.toLowerCase());
  const leadDocTitle = facts.docCategories[0]?.title ?? service.noun;
  const industryClause = facts.industry ? ` for ${city.name}'s ${facts.industry} sector` : "";

  return {
    heading: `${language.name} ${service.label} in ${city.name} for ${leadDocTitle}`,
    subHeading: `Triasia Global provides certified ${language.name} ${service.noun} in ${city.name}, ${city.state}${industryClause}, covering ${joinWithAnd(docTitles)}. This is especially relevant given ${facts.useCase}. Our government-authorized ${language.name} ${service.label.toLowerCase()}s deliver accurate, certified ${service.noun} with fast turnaround.`,
  };
}

// Distinct sentence structures, not just a single template with names swapped in,
// so pages for the same language across different cities read as genuinely different copy.
const cityVariants: Array<(ctx: TemplateCtx) => PageContent> = [
  ({ city, language, service }) => ({
    heading: `Certified ${language.name} ${service.label} Service in ${city.name}`,
    subHeading: `Triasia Global provides professional ${language.name} ${service.noun} services in ${city.name}, ${city.state}, for legal, business, medical, and personal documents. Our government-authorized ${language.name} ${service.label.toLowerCase()}s serving ${city.name} assure certified, accurate ${service.noun} with fast turnaround for clients across ${city.state}.`,
  }),
  ({ city, language, service }) => ({
    heading: `${language.name} ${service.label} in ${city.name}, ${city.state}`,
    subHeading: `Looking for a reliable ${language.name} ${service.label.toLowerCase()} in ${city.name}? Triasia Global connects you with experienced, certified linguists serving ${city.name} and the wider ${city.state} region, backed by 100% accuracy guarantees for legal, educational, and corporate ${service.noun}.`,
  }),
  ({ city, language, service }) => ({
    heading: `Professional ${language.name} ${service.label} Services — ${city.name}`,
    subHeading: `Triasia Global's team of government-approved ${language.name} linguists offers dependable ${service.noun} services throughout ${city.name}, ${city.state}. From personal certificates to corporate contracts, we deliver certified ${language.name} ${service.noun} with quick, reliable turnaround.`,
  }),
  ({ city, language, service }) => ({
    heading: `${city.name}'s Trusted ${language.name} ${service.label}`,
    subHeading: `Based across ${city.state}, our ${language.name} ${service.label.toLowerCase()}s support individuals and businesses in ${city.name} with certified, high-accuracy ${service.noun} for legal, medical, technical, and personal documents.`,
  }),
];

export function defaultCityContent(ctx: { city?: City; language: Language; service: ServiceMeta }): PageContent {
  const { city, language, service } = ctx;

  if (!city) {
    return {
      heading: `${language.name} ${service.label} Services in India`,
      subHeading: `Triasia Global provides certified ${language.name} ${service.noun} services across India for legal, business, medical, and personal documents, delivered by government-approved linguists with fast turnaround.`,
    };
  }

  const key = `${city.slug}/${language.slug}/${service.slug}`;
  const index = hashString(key) % cityVariants.length;
  return cityVariants[index]({ city, language, service });
}
