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
  // Phase 2 content-depth sections (src/content/sections.ts) — all optional so existing
  // overrides/templates and non-pilot pages that never set them are unaffected.
  documentsSection?: import("./sections").ContentBlock;
  acceptanceSection?: import("./sections").ContentBlock;
  processSteps?: import("./sections").ProcessStep[];
  languageNotesSection?: import("./sections").ContentBlock;
  deliverablesSection?: import("./sections").ContentBlock;
  relatedLinks?: import("./sections").RelatedLink[];
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

/** Turns Facts into the "why it matters" block — the demand story (who needs this and why),
 *  never a document-type list: that's buildDocumentsSection's job (src/content/sections.ts),
 *  and repeating it here read as redundant and, on interpreter pages, actively wrong (it said
 *  "documents we handle" even when the page's own Assignments section correctly said
 *  "interpreting settings"). Industry/economic facts are used only as the reason demand
 *  exists, never as a standalone city profile. */
export function buildLocalRelevance(ctx: { city?: City; language: Language; service: ServiceMeta; facts: Facts }): {
  intro: string;
  points: string[];
} {
  const { city, language, service, facts } = ctx;
  const industryPhrase = facts.industry && city ? `${city.name}'s ${facts.industry} sector` : undefined;

  const intro = city
    ? `${language.name} ${service.noun} demand in ${city.name} is driven by ${facts.useCase}${industryPhrase ? `, and by ${industryPhrase}` : ""}.`
    : `${language.name} ${service.noun} demand across India is driven by ${facts.useCase}.`;

  const points = [
    industryPhrase ? `Frequently needed by ${industryPhrase} businesses and residents` : `Common use case: ${facts.useCase}`,
    facts.notableAreas && facts.notableAreas.length > 0 && city
      ? `Serving ${language.name} ${service.noun} clients across ${joinWithAnd(facts.notableAreas)} and the wider ${city.name} area`
      : `Government-authorized, certified ${language.name} ${service.noun} with fast turnaround`,
    "See the document types and assignment settings we handle most below.",
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

// Fixed category pair for the "translation" service — deliberately NOT derived from
// city/language documentFocus (unlike buildPageFacts' general docCategories), so Translation
// pages stay topically disjoint from Translator pages for the same city/language: paperwork,
// government forms, and real estate documents, never the legal/business/technical/personal
// categories Translator already covers.
const TRANSLATION_CATEGORY_SLUGS = ["real-estate-documents", "government-paperwork"];

/** Facts for the "translation" service — same city/language grounding as buildPageFacts
 *  (industry, useCase, economicNote, notableAreas), but docCategories is always the fixed
 *  real-estate/government-paperwork pair, never the general intersection. Exported so
 *  resolveContent.ts's FAQ selection uses the same categories as the content itself. */
export function buildTranslationFacts(ctx: { city?: City; language: Language; service: ServiceMeta }): Facts {
  const facts = buildPageFacts(ctx);
  const docCategories = TRANSLATION_CATEGORY_SLUGS.map((slug) => serviceCategoriesBySlug[slug]).filter(
    (category): category is ServiceCategory => Boolean(category)
  );
  return { ...facts, docCategories };
}

/** Richer heading/subheading for the "translation" service — the official
 *  paperwork/government/real-estate document vertical, distinct from Translator's broader
 *  document-type coverage. Still weaves in real per-city facts, but the subject stays
 *  paperwork/government/real-estate throughout. */
export function buildTranslationContent(ctx: { city?: City; language: Language; service: ServiceMeta }): PageContent {
  const { city, language, service } = ctx;
  const facts = buildTranslationFacts(ctx);
  const docTitles = facts.docCategories.map((category) => category.title.toLowerCase());
  const industryClause = facts.industry && city ? `, given ${city.name}'s ${facts.industry} sector` : "";

  if (!city) {
    return {
      heading: `${language.name} ${service.label} Services in India`,
      subHeading: `Triasia Global provides certified ${language.name} ${service.noun} across India, covering ${joinWithAnd(docTitles)} — accepted by government offices, sub-registrar, and land records authorities nationwide.`,
    };
  }

  return {
    heading: `${language.name} ${service.label} in ${city.name} for ${facts.docCategories[0]?.title ?? service.noun}`,
    subHeading: `Triasia Global provides certified ${language.name} ${service.noun} in ${city.name}, ${city.state}${industryClause}, covering ${joinWithAnd(docTitles)} — accepted by government offices, sub-registrar, and land records authorities. Our government-authorized ${language.name} linguists deliver accurate, certified paperwork translation with fast turnaround.`,
    localRelevance: buildLocalRelevance({ city, language, service, facts }),
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
