import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import { statesBySlug } from "./states";
import { servicesForLanguage } from "./routes";
import { cities } from "./cities";
import { hashString, type Facts } from "./pageTemplates";
import { resolveArchetype, type PairArchetype } from "./archetype";

export interface ContentBlock {
  heading: string;
  intro: string;
  points: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface PageSections {
  documentsSection: ContentBlock;
  acceptanceSection: ContentBlock;
  processSteps: ProcessStep[];
  languageNotesSection?: ContentBlock;
  deliverablesSection: ContentBlock;
  relatedLinks: RelatedLink[];
}

function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Deterministic rotation, not random selection — same page renders the same content on
 *  every rebuild. Picks `count` consecutive items starting at a hash-seeded offset. */
function rotate<T>(items: T[], seed: string, count: number): T[] {
  if (items.length === 0) return [];
  const start = hashString(seed) % items.length;
  const n = Math.min(count, items.length);
  return Array.from({ length: n }, (_, i) => items[(start + i) % items.length]);
}

/** Attaches a hedge to any procedural/legal statement — requirements at Indian government
 *  offices and foreign missions change, and a confidently wrong sentence repeated across
 *  thousands of pages is a real harm to a real customer. */
function hedged(step: string): string {
  return `${step} Requirements differ by receiving authority and change from time to time — confirm the current process with the office that will receive your documents before you submit.`;
}

// Real, defensible mapping from document category to the kind of appointment/meeting an
// interpreter for that category is actually booked for — not fabricated, a logical
// extension of what each category already means.
const INTERPRETING_SETTINGS: Record<string, string> = {
  "legal-document-translation": "court hearings, arbitration sessions, and notary appointments",
  "educational-certificates": "university admission interviews and credential-verification meetings",
  "medical-documents": "medical consultations and second-opinion appointments",
  "technical-manuals": "factory audits, machine commissioning, and supplier inspections",
  "business-documents": "corporate meetings, negotiations, and due-diligence sessions",
  "personal-documents": "visa interviews and civil-registration appointments",
  "real-estate-documents": "sub-registrar appointments and property handover meetings",
  "government-paperwork": "government-office appointments and licensing interviews",
};

/** Section 3: "Documents we translate" for translator/translation, reframed as "assignments
 *  we interpret" for interpreter — the single biggest structural fix, since interpreter pages
 *  were previously the same document-type copy as translator pages for the same city+language. */
export function buildDocumentsSection(ctx: {
  city?: City;
  language: Language;
  service: ServiceMeta;
  facts: Facts;
}): ContentBlock {
  const { city, language, service, facts } = ctx;
  const key = `${city?.slug ?? "national"}/${language.slug}/${service.slug}:documents`;
  const industryClause = facts.industry && city ? `, reflecting ${city.name}'s ${facts.industry} sector` : "";

  if (service.slug === "interpreter") {
    const settings = facts.docCategories.map((c) => INTERPRETING_SETTINGS[c.slug]).filter(Boolean);
    return {
      heading: city ? `${language.name} interpreting assignments in ${city.name}` : `${language.name} interpreting assignments`,
      intro: `${language.name} interpreters are most often booked for ${joinWithAnd(settings)}${industryClause}.`,
      points: [
        ...settings.slice(0, 3).map((s) => `Common setting: ${s}`),
        "Available in consecutive and simultaneous modes, on-site or via video",
      ],
    };
  }

  const docTitles = facts.docCategories.map((c) => c.title.toLowerCase());
  const detailPoints = facts.docCategories.flatMap((category) =>
    rotate(category.details, `${key}:${category.slug}`, 2).map((detail) => `${category.title}: ${detail}`)
  );

  return {
    heading: city ? `${language.name} document types we translate in ${city.name}` : `${language.name} document types we translate`,
    intro: `${language.name} ${service.noun} requests most often cover ${joinWithAnd(docTitles)}${industryClause}.`,
    points: detailPoints.slice(0, 6),
  };
}

/** Section 4: where these translations are accepted, and the attestation chain where one
 *  applies — the archetype fork with the most real institutional detail. */
export function buildAcceptanceSection(ctx: { city?: City; language: Language; archetype: PairArchetype }): ContentBlock {
  const { city, language, archetype } = ctx;
  const state = city ? statesBySlug[city.stateSlug] : undefined;
  const heading = city ? `Where ${language.name} translations are accepted in ${city.name}` : `Where ${language.name} translations are accepted`;

  if (archetype === "foreign-corridor") {
    const legalisation = language.legalisation;
    const routeSentence = legalisation
      ? `${legalisation.country} is ${legalisation.route === "apostille" ? "a Hague Apostille Convention member" : "not a Hague Apostille Convention member"}, so documents typically need ${
          legalisation.route === "apostille" ? "an apostille from the Ministry of External Affairs" : "attestation from the relevant embassy or consulate"
        } after notarisation.`
      : "Requirements vary by destination country — some accept an apostille from the Ministry of External Affairs, others require embassy attestation.";
    return {
      heading,
      intro: `${language.name} translations for use abroad are usually notarised before submission. ${routeSentence}`,
      points: [
        hedged("Personal and educational documents typically go through notarisation, then state-level home department attestation, then the Ministry of External Affairs."),
        "Business documents may additionally need Chamber of Commerce certification before MEA processing.",
        state
          ? `Within India, the same translations are accepted domestically by ${state.registrationDept} and by local RTO and passport offices.`
          : "Within India, the same translations are accepted by government offices, banks, and educational institutions.",
      ],
    };
  }

  if (archetype === "state-native" && state && city) {
    return {
      heading,
      intro: `${language.name} documents issued by ${state.name} authorities are translated into English for use with central-government bodies, other states, and overseas institutions.`,
      points: [
        `Certificates from ${state.schoolBoard} are accepted once translated, and attested by ${state.homeDeptAttestation} where required.`,
        `Property and land records registered with ${state.registrationDept} are translated to match the format receiving offices expect.`,
        hedged(`Court and legal documents from ${state.highCourt} follow the standard state attestation process.`),
      ],
    };
  }

  // interstate
  return {
    heading,
    intro: `${language.name} documents issued outside ${state?.name ?? "the state"} are translated to the format ${city?.name ?? "local"} authorities and employers expect.`,
    points: [
      "Accepted by RTOs, municipal offices, and local employers for verification and record-keeping.",
      hedged("Government offices may ask to see the original document alongside the certified translation."),
      state
        ? `For documents that need local re-registration, ${state.registrationDept} is the relevant authority.`
        : "Local registration offices can confirm specific requirements.",
    ],
  };
}

/** Section 5: "How it works" — genuinely different per service, not a relabelled document
 *  workflow for interpreter pages. */
export function buildProcessSteps(service: ServiceMeta): ProcessStep[] {
  if (service.slug === "interpreter") {
    return [
      { title: "Share the details", description: "Tell us the date, language pair, subject matter, and format — in-person or remote." },
      { title: "Interpreter matched", description: "We assign an interpreter with relevant subject-matter experience for your setting." },
      { title: "Briefing pack", description: "We prepare a short terminology brief so the interpreter arrives ready for your specific context." },
      { title: "On the day", description: "The interpreter joins on-site or via video, working consecutively or simultaneously as your setting needs." },
    ];
  }
  if (service.slug === "translation") {
    return [
      { title: "Document check", description: "We review your source document and confirm the exact paperwork and certification required." },
      { title: "Name matching", description: "Names are transliterated to match your passport or ID exactly, avoiding a mismatch with your other paperwork." },
      { title: "Certified translation", description: "We translate and format the document to mirror your original, ready for submission." },
      { title: "Delivery", description: "You receive a certified soft copy, with stamped hard copies available on request." },
    ];
  }
  return [
    { title: "Share your document", description: "Send a scan or photo of your document — we'll confirm scope and turnaround." },
    { title: "Translation", description: "A certified translator renders the document, preserving meaning, formatting, and terminology." },
    { title: "Certification", description: "We attach a signed translator's declaration and company stamp to certify accuracy." },
    { title: "Delivery", description: "You receive a certified soft copy, with stamped hard copies and notarisation coordination available." },
  ];
}

/** Section 6: script/handling notes — pure language data, identical for a given language
 *  across every city, which is correct (it's genuinely about the language, not the city).
 *  Omitted entirely when a language has no scriptNotes, so page shape isn't uniform. */
export function buildLanguageNotesSection(language: Language): ContentBlock | undefined {
  if (!language.scriptNotes || language.scriptNotes.length === 0) return undefined;
  return {
    heading: `Working between ${language.name} and English`,
    intro: `${language.name} is written in ${language.script}${language.direction === "rtl" ? ", read right-to-left" : ""}. A few things we pay attention to:`,
    points: language.scriptNotes,
  };
}

/** Section 7: what the client actually receives — a deliverable spec, not a claim. */
export function buildDeliverablesSection(service: ServiceMeta): ContentBlock {
  if (service.slug === "interpreter") {
    return {
      heading: "What's included",
      intro: "Every interpreting assignment includes:",
      points: [
        "An interpreter matched to your subject matter and language pair",
        "A short pre-briefing to align on terminology and context",
        "Consecutive or simultaneous interpretation as your setting requires",
        "On-site or remote delivery via video call",
      ],
    };
  }
  return {
    heading: "What you receive",
    intro: "Every certified translation includes:",
    points: [
      "A signed translator's declaration of accuracy",
      "Company letterhead and stamp on every page",
      "A layout that mirrors your original document, page for page",
      "Free revisions if a correction is needed to match your original",
    ],
  };
}

/** Section 9: contextual related links — nearby cities in the same state, and the sibling
 *  services for this exact city+language. Uses servicesForLanguage() so a link is never
 *  offered to a page that doesn't exist (e.g. "translation" outside its pilot cohort). */
export function buildRelatedLinks(ctx: { city?: City; language: Language; service: ServiceMeta }): RelatedLink[] {
  const { city, language, service } = ctx;
  const links: RelatedLink[] = [];

  if (city) {
    const nearby = cities
      .filter((c) => c.stateSlug === city.stateSlug && c.slug !== city.slug)
      .filter((c) => !c.languages || c.languages.includes(language.slug))
      .filter((c) => servicesForLanguage(language, c).some((s) => s.slug === service.slug))
      .slice(0, 3);
    for (const nearbyCity of nearby) {
      links.push({ label: `${language.name} ${service.label} in ${nearbyCity.name}`, href: `/${nearbyCity.slug}/${language.slug}/${service.slug}/` });
    }
  }

  const siblingServices = servicesForLanguage(language, city).filter((s) => s.slug !== service.slug);
  for (const sibling of siblingServices) {
    const href = city ? `/${city.slug}/${language.slug}/${sibling.slug}/` : `/${language.slug}/${sibling.slug}/`;
    const label = city ? `${language.name} ${sibling.label} in ${city.name}` : `${language.name} ${sibling.label}`;
    links.push({ label, href });
  }

  return links.slice(0, 6);
}

/** Assembles every new section for one page. Callers layer this onto whatever heading/
 *  subheading/localRelevance/faqs already resolved, so hand-authored overrides and language
 *  templates keep their existing copy and only gain these additional blocks. */
export function buildPageSections(ctx: { city?: City; language: Language; service: ServiceMeta; facts: Facts }): PageSections {
  const { city, language, service, facts } = ctx;
  const archetype = resolveArchetype(language, city);

  return {
    documentsSection: buildDocumentsSection({ city, language, service, facts }),
    acceptanceSection: buildAcceptanceSection({ city, language, archetype }),
    processSteps: buildProcessSteps(service),
    languageNotesSection: buildLanguageNotesSection(language),
    deliverablesSection: buildDeliverablesSection(service),
    relatedLinks: buildRelatedLinks({ city, language, service }),
  };
}
