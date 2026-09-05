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


export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

