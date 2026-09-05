import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { ContentSection, ContentSectionItem, FaqItem, PageContent } from "./pageTemplates";
import { pickVariant, pickOrder } from "./contentVariants";
import { buildLanguagePairs } from "./languagePairs";
import { fitTitle } from "./seo";

interface Ctx {
  city?: City;
  language: Language;
}

type TextVariant = (ctx: Ctx) => string;

// Real structured data only (city name/state, language name) — never invented
// local facts, per the no-fabricated-place-details rule. `areaIn`/`areaAcross`
// give hub pages an "in India" fallback so the same variant pools serve both.
function areaIn(ctx: Ctx): string {
  return ctx.city ? `in ${ctx.city.name}` : "in India";
}
function areaAcross(ctx: Ctx): string {
  return ctx.city ? `across ${ctx.city.name} and ${ctx.city.state}` : "across India";
}
function citySuffix(ctx: Ctx): string {
  return ctx.city ? ` in ${ctx.city.name}` : "";
}

const seoTitleVariants: TextVariant[] = [
  (ctx) => `${ctx.language.name} Translation Services ${areaIn(ctx)} | Certified ${ctx.language.name} Translators`,
  (ctx) => `Certified ${ctx.language.name} Translators ${areaIn(ctx)} | ${ctx.language.name} Translation Services`,
  (ctx) => `${ctx.language.name} Translator & Translation Services ${areaIn(ctx)} | TriasiaGlobal`,
];

// Every variant embeds both city name and language name for city pages — a hard
// requirement so no two city pages for the same language can collide on title/H1.
const headingVariants: TextVariant[] = [
  (ctx) => `Certified ${ctx.language.name} Translation Services ${areaIn(ctx)}`,
  (ctx) => `${ctx.language.name} Translation Services ${areaIn(ctx)} — Certified & Govt. Approved`,
  (ctx) => `Professional ${ctx.language.name} Translation Services ${areaIn(ctx)}`,
  (ctx) =>
    ctx.city
      ? `${ctx.language.name} Translation Services — ${ctx.city.name}, ${ctx.city.state}`
      : `${ctx.language.name} Translation Services Across India`,
];

const introVariants: TextVariant[] = [
  (ctx) =>
    `Triasia Global is a govt approved Translation Agency providing Certified ${ctx.language.name} Translator Services ${areaIn(ctx)} for Legal Documents, Marriage Certificates, Educational Certificates, Driving Licenses, Visa & Immigration Documents, etc. Our Govt Authorized ${ctx.language.name} Translators assure 100% certified & legal ${ctx.language.name} Translation service with high accuracy at reasonable prices.`,
  (ctx) =>
    `Triasia Global provides certified ${ctx.language.name} translation and translator services ${areaIn(ctx)} for legal documents, marriage and educational certificates, driving licenses, and visa or immigration paperwork. Our government-authorized ${ctx.language.name} translators guarantee accurate, legally accepted translations at reasonable prices.`,
  (ctx) =>
    `As a govt approved Translation Agency, Triasia Global offers certified ${ctx.language.name} translator services ${areaIn(ctx)} covering legal, educational, medical, and personal documents. Every ${ctx.language.name} translation is handled by government-authorized linguists and backed by a 100% accuracy guarantee.`,
];

const section1BodyVariants: TextVariant[] = [
  (ctx) =>
    `Triasia Global delivers professional ${ctx.language.name} translation services for individuals, businesses, and government agencies ${areaAcross(ctx)}. Our certified ${ctx.language.name} translators handle everything from single-page certificates to large multi-document legal and corporate projects, with every translation reviewed for linguistic accuracy and formatting fidelity to the source document.`,
  (ctx) =>
    `Our ${ctx.language.name} translation team supports clients ${areaAcross(ctx)} with certified, accurate work on everything from short certificates to lengthy legal and corporate documents, reviewed for both linguistic accuracy and formatting.`,
  (ctx) =>
    `Whether you need a single certificate or a full set of corporate documents translated, our certified ${ctx.language.name} translators ${areaAcross(ctx)} deliver accurate, properly formatted translations reviewed before certification.`,
];

const section2BodyVariants: TextVariant[] = [
  (ctx) =>
    `We translate English documents into fluent, legally accurate ${ctx.language.name} for use with Indian courts, government departments, universities, and private institutions ${areaIn(ctx)}. Our English to ${ctx.language.name} translators preserve technical and legal terminology while producing ${ctx.language.name} text that reads naturally to native speakers.`,
  (ctx) =>
    `Our English to ${ctx.language.name} translators convert English source documents into natural, legally sound ${ctx.language.name}, accepted by courts, government offices, and universities ${areaIn(ctx)}, while keeping technical and legal terminology intact.`,
  (ctx) =>
    `From contracts to certificates, we translate English documents into accurate, natural-reading ${ctx.language.name} for use with courts, government departments, and institutions ${areaIn(ctx)}.`,
];

const section3BodyVariants: TextVariant[] = [
  (ctx) =>
    `Our ${ctx.language.name} to English translation service converts ${ctx.language.name}-language certificates, contracts, and official records into certified English documents accepted by embassies, universities, immigration authorities, and courts ${areaIn(ctx)} and abroad. Every translation carries a signed certificate of accuracy.`,
  (ctx) =>
    `We convert ${ctx.language.name} certificates, contracts, and official records into certified English translations accepted by embassies, universities, and immigration authorities, each backed by a signed certificate of accuracy.`,
  (ctx) =>
    `Certificates, contracts, and official ${ctx.language.name} records are translated into certified English accepted by courts, embassies, and immigration offices ${areaIn(ctx)}, with a signed accuracy certificate on every document.`,
];

const section4IntroVariants: TextVariant[] = [
  (ctx) =>
    `From legal filings to medical reports, our government-authorized ${ctx.language.name} translators are experienced across the full range of document types that require certified translation ${areaIn(ctx)}.`,
  (ctx) =>
    `Our government-authorized ${ctx.language.name} translators cover the full range of certified document types ${areaIn(ctx)}, from legal filings and medical records to business and personal paperwork.`,
  (ctx) =>
    `Whatever the document type, our certified ${ctx.language.name} translators ${areaIn(ctx)} bring experience across legal, medical, business, and personal translation work.`,
];

const section5IntroVariants: TextVariant[] = [
  (ctx) =>
    `Beyond certified translation, Triasia Global assists with apostille attestation for ${ctx.language.name} documents that need legal recognition in Hague Convention member countries. We coordinate notarization, state-level (HRD/SDM) attestation, and MEA apostille stamping, so your translated ${ctx.language.name} documents are ready for use abroad without extra runaround.`,
  (ctx) =>
    `In addition to translation, we handle apostille attestation for ${ctx.language.name} documents headed to Hague Convention member countries — coordinating notarization, state-level (HRD/SDM) attestation, and MEA stamping end to end.`,
  (ctx) =>
    `Many ${ctx.language.name} documents also need apostille attestation for use abroad. We manage the full process — notarization, HRD/SDM state attestation, and MEA apostille stamping — alongside certified translation.`,
];

const section6BodyVariants: TextVariant[] = [
  (ctx) =>
    `Every ${ctx.language.name} translator on our team is government-authorized and native or near-native fluent, with subject-matter experience across legal, medical, technical, and academic domains. Translations are reviewed by a second linguist before certification, ensuring consistent quality across every document we deliver.`,
  (ctx) =>
    `Our ${ctx.language.name} translators are government-authorized, native or near-native fluent, and experienced across legal, medical, technical, and academic subject matter — with every translation checked by a second linguist before certification.`,
  (ctx) =>
    `We work only with government-authorized, native-level ${ctx.language.name} linguists experienced in legal, medical, technical, and academic translation, and every document passes a second-linguist review before certification.`,
];

const section7BodyVariants: TextVariant[] = [
  (ctx) =>
    `We combine certified accuracy, fast turnaround, and government-recognized credentials with transparent, reasonable pricing. Our ${ctx.language.name} translations are accepted by Indian courts, RTOs, universities, embassies, and immigration authorities, backed by ISO-certified quality processes and a 100% acceptance guarantee.`,
  (ctx) =>
    `Certified accuracy, fast turnaround, and government-recognized credentials come standard, at transparent and reasonable pricing. Courts, RTOs, universities, embassies, and immigration authorities across India accept our ${ctx.language.name} translations, backed by ISO-certified quality processes.`,
  (ctx) =>
    `Our ${ctx.language.name} translations combine certified accuracy with fast turnaround and transparent pricing, backed by government-recognized credentials, ISO-certified processes, and acceptance by courts, RTOs, universities, and embassies.`,
];

const languagePairsIntroRegional: TextVariant[] = [
  (ctx) =>
    `As a regional Indian language, ${ctx.language.name} documents can be translated into English or into any of the international languages we support — and English documents can be translated into ${ctx.language.name}. Explore the language pairs we offer below.`,
  (ctx) =>
    `${ctx.language.name} pairs with English directly, and with any of our supported international languages as well — while English documents can also be translated into ${ctx.language.name}. See the combinations below.`,
  (ctx) =>
    `We translate ${ctx.language.name} documents into English and into the other international languages we support, plus English into ${ctx.language.name}. The pairs we offer are listed below.`,
];

const languagePairsIntroForeign: TextVariant[] = [
  (ctx) =>
    `As an international language, ${ctx.language.name} translation with Triasia Global is offered between ${ctx.language.name} and English — the language pair required for legal, business, and immigration use in India.`,
  (ctx) =>
    `${ctx.language.name} translation with us runs between ${ctx.language.name} and English, the pairing accepted for legal, business, and immigration use across India.`,
  (ctx) =>
    `We offer ${ctx.language.name} translation paired with English in both directions, the combination needed for legal, business, and immigration purposes in India.`,
];

interface DocItemDef {
  id: string;
  headingSuffix: string;
  bodyVariants: string[];
}

const docTypeItems: DocItemDef[] = [
  {
    id: "legal",
    headingSuffix: "Legal Document Translation",
    bodyVariants: [
      "Court judgments, affidavits, power of attorney, and property agreements translated with precise legal terminology for submission to courts and government offices.",
      "We handle affidavits, contracts, court orders, and property deeds, translating legal language accurately so documents hold up with courts, tribunals, and government departments.",
      "From power of attorney to property agreements, our legal translators preserve exact legal meaning for filings with Indian courts and official bodies.",
    ],
  },
  {
    id: "educational",
    headingSuffix: "Educational Certificate Translation",
    bodyVariants: [
      "Degree certificates, mark sheets, and transcripts translated for university admissions, credential evaluation, and employment verification.",
      "We translate degree certificates, academic transcripts, and mark sheets for university applications, credential assessments, and job verification abroad.",
      "Diplomas, mark sheets, and transcripts are translated accurately to support university admissions, credential evaluation, and employment checks.",
    ],
  },
  {
    id: "medical",
    headingSuffix: "Medical Document Translation",
    bodyVariants: [
      "Medical reports, prescriptions, and hospital records translated accurately for insurance claims, treatment abroad, and visa medical requirements.",
      "We translate hospital records, prescriptions, and medical reports for insurance claims, overseas treatment, and visa medical documentation.",
      "Prescriptions, discharge summaries, and medical reports are translated precisely to support insurance claims and visa medical requirements.",
    ],
  },
  {
    id: "business",
    headingSuffix: "Business Document Translation",
    bodyVariants: [
      "Contracts, MOUs, financial statements, and company registration documents translated for cross-border business and compliance filings.",
      "We translate MOUs, contracts, and company registration papers, along with financial statements, for cross-border business and regulatory filings.",
      "From financial statements to incorporation documents, we translate business paperwork for cross-border deals and compliance requirements.",
    ],
  },
  {
    id: "personal",
    headingSuffix: "Personal Document Translation",
    bodyVariants: [
      "Marriage certificates, birth certificates, driving licenses, and identity documents translated for visa, immigration, and legal use.",
      "We translate birth certificates, marriage certificates, and driving licenses for visa applications, immigration processes, and legal purposes.",
      "Identity documents, marriage certificates, and driving licenses are translated accurately for visa, immigration, and everyday legal needs.",
    ],
  },
];

interface ApostilleItemDef {
  id: string;
  heading: string;
  bodyVariants: string[];
}

const apostilleItems: ApostilleItemDef[] = [
  {
    id: "educational",
    heading: "Educational Document Apostille",
    bodyVariants: [
      "Degree certificates, mark sheets, and diplomas apostilled through HRD attestation and the Ministry of External Affairs for study and work visas abroad.",
      "We coordinate HRD and MEA apostille for degree certificates, diplomas, and mark sheets needed for study or work visas overseas.",
      "Degree certificates and academic transcripts are apostilled via HRD attestation and MEA stamping for use in study and work visa applications.",
    ],
  },
  {
    id: "personal",
    heading: "Personal Document Apostille",
    bodyVariants: [
      "Birth certificates, marriage certificates, and affidavits apostilled for immigration, marriage registration, and residency applications overseas.",
      "We apostille birth certificates, marriage certificates, and affidavits for overseas immigration, marriage registration, and residency needs.",
      "Marriage certificates, birth certificates, and affidavits are apostilled to support immigration, residency, and marriage registration abroad.",
    ],
  },
  {
    id: "business",
    heading: "Business Document Apostille",
    bodyVariants: [
      "Company incorporation certificates, board resolutions, and power of attorney documents apostilled for international business transactions.",
      "We apostille incorporation certificates, board resolutions, and power of attorney documents for cross-border business transactions.",
      "Board resolutions, incorporation certificates, and power of attorney documents are apostilled for use in international business dealings.",
    ],
  },
];

const faq1AnswerVariants: TextVariant[] = [
  (ctx) =>
    `Yes. Every ${ctx.language.name} translation includes a signed certificate of accuracy and is accepted by Indian courts, RTOs, universities, embassies, and immigration authorities.`,
  (ctx) =>
    `Yes — each ${ctx.language.name} translation comes with a signed accuracy certificate and is accepted by courts, RTOs, universities, embassies, and immigration offices across India.`,
  (ctx) =>
    `Yes. Our ${ctx.language.name} translations carry a signed certificate of accuracy and are accepted by Indian courts, universities, embassies, and immigration authorities.`,
];

const faq2AnswerVariants: TextVariant[] = [
  (ctx) =>
    `Most standard ${ctx.language.name} documents — certificates, licenses, short contracts — are delivered within 24–48 hours. Urgent same-day turnaround is available on request.`,
  (ctx) =>
    `Standard ${ctx.language.name} documents like certificates and short contracts are typically ready in 24–48 hours, with same-day turnaround available for urgent requests.`,
  (ctx) =>
    `Turnaround for most ${ctx.language.name} certificates and short contracts is 24–48 hours; urgent same-day delivery can be arranged on request.`,
];

const faq3AnswerVariants: TextVariant[] = [
  (ctx) =>
    `Yes, we provide certified translation in both directions — English to ${ctx.language.name} and ${ctx.language.name} to English — for legal, medical, business, and personal documents.`,
  (ctx) =>
    `Yes. We handle certified translation both ways — English to ${ctx.language.name} and ${ctx.language.name} to English — across legal, medical, business, and personal documents.`,
  (ctx) =>
    `Yes, certified translation is available in both directions, English to ${ctx.language.name} and back, for legal, medical, business, and personal paperwork.`,
];

const faq4RegionalAnswerVariants: TextVariant[] = [
  (ctx) =>
    `Yes. We translate ${ctx.language.name} documents into major international languages including German, French, Spanish, Chinese, Japanese, Korean, and more, for visa, immigration, and business use.`,
  (ctx) =>
    `Yes — beyond English, we translate ${ctx.language.name} documents into international languages such as German, French, Spanish, Chinese, Japanese, and Korean for visa, immigration, and business needs.`,
  (ctx) =>
    `Yes. ${ctx.language.name} documents can be translated into a range of international languages, including German, French, Spanish, Chinese, Japanese, and Korean, for visa, immigration, and business purposes.`,
];

const faq4ForeignAnswerVariants: TextVariant[] = [
  (ctx) =>
    `We route ${ctx.language.name} translations through certified English, our working pair for all foreign-language documents, which is the format accepted by Indian courts, customs, and government offices.`,
  (ctx) =>
    `${ctx.language.name} translations are routed through certified English rather than directly into a regional language — that's the pairing accepted by Indian courts, customs, and government offices.`,
  (ctx) =>
    `We translate ${ctx.language.name} through certified English rather than directly to a regional language, since English is the pairing accepted by Indian courts, customs, and government authorities.`,
];

const faq5AnswerVariants: TextVariant[] = [
  () =>
    `We translate legal documents, marriage and birth certificates, educational certificates, driving licenses, medical records, business contracts, and visa or immigration paperwork.`,
  (ctx) =>
    `Our ${ctx.language.name} translation work covers legal documents, birth and marriage certificates, educational certificates, driving licenses, medical records, business contracts, and visa or immigration paperwork.`,
  (ctx) =>
    `We handle ${ctx.language.name} translation for legal documents, educational certificates, medical records, business contracts, driving licenses, marriage and birth certificates, and visa or immigration paperwork.`,
];

const faq6AnswerVariants: TextVariant[] = [
  () =>
    `Yes. Alongside certified translation, we handle notarization, HRD/SDM attestation, and MEA apostille stamping so your documents are ready for legal use in Hague Convention member countries.`,
  () =>
    `Yes — we manage notarization, HRD/SDM state attestation, and MEA apostille stamping alongside certified translation, so documents are ready for use in Hague Convention countries.`,
  () =>
    `Yes. In addition to translation, we coordinate notarization, HRD/SDM attestation, and MEA apostille stamping for use in Hague Convention member countries.`,
];

export function buildDefaultTranslatorContent(ctx: {
  city?: City;
  language: Language;
  service: ServiceMeta;
}): PageContent {
  const { city, language } = ctx;
  const vctx: Ctx = { city, language };
  const seedKey = city ? `/${city.slug}/${language.slug}/translator/` : `/${language.slug}/translator/`;

  // Richest form first; fitTitle drops to a shorter one when city + language names
  // push it past what Google will actually display.
  const seoTitle = fitTitle([
    pickVariant(seedKey, "seoTitle", seoTitleVariants)(vctx),
    `${language.name} Translation Services ${areaIn(vctx)} | TriasiaGlobal`,
    `Certified ${language.name} Translator ${areaIn(vctx)}`,
    `${language.name} Translator ${areaIn(vctx)}`,
  ]);
  const heading = pickVariant(seedKey, "heading", headingVariants)(vctx);

  if (city && (!heading.includes(city.name) || !heading.includes(language.name))) {
    throw new Error(`buildDefaultTranslatorContent: heading missing city/language name for ${seedKey}`);
  }

  const subHeading = pickVariant(seedKey, "intro", introVariants)(vctx);
  const suffix = citySuffix(vctx);

  const docItems: ContentSectionItem[] = pickOrder(seedKey, "doc-items-order", docTypeItems).map((def) => ({
    heading: `${language.name} ${def.headingSuffix}`,
    body: pickVariant(seedKey, `doc-item-${def.id}-body`, def.bodyVariants),
  }));

  const resolvedApostilleItems: ContentSectionItem[] = pickOrder(
    seedKey,
    "apostille-items-order",
    apostilleItems
  ).map((def) => ({
    heading: def.heading,
    body: pickVariant(seedKey, `apostille-item-${def.id}-body`, def.bodyVariants),
  }));

  const sections: ContentSection[] = [
    {
      heading: `${language.name} Translation Services${suffix}`,
      body: pickVariant(seedKey, "section1-body", section1BodyVariants)(vctx),
    },
    {
      heading: `English to ${language.name} Translation Services${suffix}`,
      body: pickVariant(seedKey, "section2-body", section2BodyVariants)(vctx),
    },
    {
      heading: `${language.name} to English Translation Services${suffix}`,
      body: pickVariant(seedKey, "section3-body", section3BodyVariants)(vctx),
    },
    {
      heading: `Certified ${language.name} Document Translation${suffix}`,
      body: pickVariant(seedKey, "section4-body", section4IntroVariants)(vctx),
      items: docItems,
    },
    {
      heading: `Apostille Services for ${language.name} Documents${suffix}`,
      body: pickVariant(seedKey, "section5-body", section5IntroVariants)(vctx),
      items: resolvedApostilleItems,
    },
    {
      heading: `Professional ${language.name} Translators${suffix}`,
      body: pickVariant(seedKey, "section6-body", section6BodyVariants)(vctx),
    },
    {
      heading: `Why Choose Triasia Global for ${language.name} Translation${suffix}?`,
      body: pickVariant(seedKey, "section7-body", section7BodyVariants)(vctx),
    },
  ];

  const pairsIntroPool = language.type === "regional" ? languagePairsIntroRegional : languagePairsIntroForeign;
  const languagePairs = {
    heading: `${language.name} Translation Language ${language.type === "regional" ? "Combinations" : "Pairs"}`,
    intro: pickVariant(seedKey, "pairs-intro", pairsIntroPool)(vctx),
    pairs: buildLanguagePairs(language),
  };

  const faq: FaqItem[] = [
    {
      question: `Is Triasia Global's ${language.name} translation certified and accepted for official use${suffix}?`,
      answer: pickVariant(seedKey, "faq-1-answer", faq1AnswerVariants)(vctx),
    },
    {
      question: `How long does certified ${language.name} translation take${suffix}?`,
      answer: pickVariant(seedKey, "faq-2-answer", faq2AnswerVariants)(vctx),
    },
    {
      question: `Do you translate both English to ${language.name} and ${language.name} to English?`,
      answer: pickVariant(seedKey, "faq-3-answer", faq3AnswerVariants)(vctx),
    },
    language.type === "regional"
      ? {
          question: `Can you translate ${language.name} documents into languages other than English?`,
          answer: pickVariant(seedKey, "faq-4-answer", faq4RegionalAnswerVariants)(vctx),
        }
      : {
          question: `Can you translate ${language.name} directly into another regional Indian language?`,
          answer: pickVariant(seedKey, "faq-4-answer", faq4ForeignAnswerVariants)(vctx),
        },
    {
      question: `What documents can you translate from ${language.name}${suffix}?`,
      answer: pickVariant(seedKey, "faq-5-answer", faq5AnswerVariants)(vctx),
    },
    {
      question: `Do you also provide apostille services for ${language.name} documents${suffix}?`,
      answer: pickVariant(seedKey, "faq-6-answer", faq6AnswerVariants)(vctx),
    },
  ];

  return { seoTitle, heading, subHeading, sections, languagePairs, faq };
}
