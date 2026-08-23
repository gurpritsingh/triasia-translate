import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";

export interface ContentSectionItem {
  heading: string;
  body?: string;
}

export interface ContentSection {
  heading: string;
  body?: string;
  items?: ContentSectionItem[];
}

export interface LanguagePairsBlock {
  heading: string;
  intro?: string;
  pairs: Array<{ from: string; to: string }>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  heading: string;
  subHeading: string;
  /** Optional custom <title> tag text; falls back to the auto-generated default when absent. */
  seoTitle?: string;
  /** Optional H2 (+H3) content sections rendered below the hero. */
  sections?: ContentSection[];
  /** Optional "language to language" combinations section. */
  languagePairs?: LanguagePairsBlock;
  /** Optional FAQ section, also emitted as FAQPage JSON-LD. */
  faq?: FaqItem[];
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
