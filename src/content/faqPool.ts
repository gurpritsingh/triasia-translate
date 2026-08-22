import type { ServiceSlug } from "./services";

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  appliesTo: { service?: ServiceSlug[]; documentCategory?: string[]; always?: boolean };
}

// Real, generic-but-true operational FAQs about the service/process — same trust level as
// TrustBar's certifications. Never city-specific claims, so no fabrication risk.
export const faqPool: FaqEntry[] = [
  {
    id: "turnaround",
    question: "How fast can I get my documents translated?",
    answer:
      "Most certified document translations are delivered within 24-48 hours. Same-day turnaround is available for time-sensitive paperwork such as visa or court submissions.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "govt-accepted",
    question: "Are your translations accepted by government offices and embassies?",
    answer:
      "Yes. Triasia Global is ISO 9001:2015 and ISO 17100:2015 certified, and our certified translations are accepted by Indian government offices, courts, universities, and foreign embassies and consulates.",
    appliesTo: { always: true },
  },
  {
    id: "interpreter-booking",
    question: "How do I book an interpreter for a meeting or event?",
    answer:
      "Share your event date, language pair, and meeting format (in-person or remote) with our team, and we'll assign a qualified interpreter with relevant subject-matter experience.",
    appliesTo: { service: ["interpreter"] },
  },
  {
    id: "legal-docs",
    question: "Can you translate court and legal documents?",
    answer:
      "Yes, our certified legal translators handle contracts, affidavits, court documents, and power-of-attorney paperwork with precise legal terminology accepted by courts and government offices.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["legal-document-translation"] },
  },
  {
    id: "business-docs",
    question: "Do you translate business contracts and corporate documents?",
    answer:
      "Yes, we translate company profiles, contracts, business proposals, and trade documentation, tailored to your industry and audience.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["business-documents"] },
  },
  {
    id: "personal-docs",
    question: "Can you translate personal documents like birth or marriage certificates?",
    answer:
      "Yes, we provide certified translation of birth certificates, marriage certificates, ID documents, and other personal records accepted by visa and immigration authorities.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["personal-documents"] },
  },
  {
    id: "technical-docs",
    question: "Do you handle technical manuals and engineering documentation?",
    answer:
      "Yes, our technical translators accurately render user manuals, specifications, and engineering documentation for manufacturing and product teams.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["technical-manuals"] },
  },
  {
    id: "educational-docs",
    question: "Can you translate degrees, transcripts, and educational certificates?",
    answer:
      "Yes, we provide certified translations of degrees, transcripts, and school certificates accepted by universities, embassies, and immigration authorities.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["educational-certificates"] },
  },
  {
    id: "pricing",
    question: "How is translation pricing calculated?",
    answer:
      "Pricing depends on document length, language pair, and turnaround time. Contact us for a free quote based on your specific documents.",
    appliesTo: { always: true },
  },
  {
    id: "confidentiality",
    question: "Is my document kept confidential?",
    answer:
      "Yes, all documents are handled under strict confidentiality, and we can sign an NDA on request for sensitive business or legal paperwork.",
    appliesTo: { always: true },
  },
  {
    id: "revisions",
    question: "What if I need changes after delivery?",
    answer: "We offer free revisions if any correction is needed to match your original document's meaning and formatting.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "real-estate-docs",
    question: "Can you translate property sale deeds and registration documents?",
    answer:
      "Yes, we provide certified translation of sale deeds, property registration paperwork, lease agreements, and mutation records accepted by sub-registrar and land records offices.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["real-estate-documents"] },
  },
  {
    id: "government-paperwork",
    question: "Do you translate government forms and municipal paperwork?",
    answer:
      "Yes, we translate government application forms, municipal certificates, and licensing or registration documents, accepted by government offices and departments.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["government-paperwork"] },
  },
  {
    id: "translator-vs-interpreter",
    question: "What's the difference between a translator and an interpreter?",
    answer:
      "A translator works with written documents, while an interpreter provides real-time spoken language conversion for meetings, conferences, and events.",
    appliesTo: { always: true },
  },
  {
    id: "notarization",
    question: "Do you handle notarization and apostille as well as translation?",
    answer:
      "We coordinate notarization and apostille/embassy attestation alongside your translation where needed, so you're not managing separate vendors for each step.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "name-spelling",
    question: "How do you handle names that are spelled differently across my documents?",
    answer:
      "We match the spelling already used on your passport or primary ID, rather than transliterating fresh each time, so your documents stay consistent with each other.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "delivery-format",
    question: "Do I get a soft copy or a hard copy?",
    answer:
      "You receive a certified soft copy by default. Stamped physical hard copies are available on request for offices that require a wet-ink stamp.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "multi-page",
    question: "Can you translate multi-page documents like agreements or transcripts?",
    answer:
      "Yes, we translate documents of any length, from single-page certificates to multi-page contracts and academic transcripts, preserving the original page layout.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "consecutive-vs-simultaneous",
    question: "What's the difference between consecutive and simultaneous interpreting?",
    answer:
      "Consecutive interpreting happens in turns — the speaker pauses for the interpreter — and suits smaller meetings. Simultaneous interpreting happens in real time, usually with equipment, and suits conferences and large events.",
    appliesTo: { service: ["interpreter"] },
  },
  {
    id: "remote-interpreting",
    question: "Can an interpreter join remotely instead of coming on-site?",
    answer:
      "Yes, we provide remote interpreting over video call for meetings, interviews, and consultations where an on-site interpreter isn't necessary.",
    appliesTo: { service: ["interpreter"] },
  },
  {
    id: "interpreter-briefing",
    question: "How much notice do you need to arrange an interpreter?",
    answer:
      "For common language pairs, we can often arrange an interpreter within 24-48 hours. For less common languages or specialised subject matter, a few extra days lets us match the right interpreter and prepare a terminology brief.",
    appliesTo: { service: ["interpreter"] },
  },
  {
    id: "medical-docs",
    question: "Do you handle medical reports and prescriptions?",
    answer:
      "Yes, we translate medical reports, prescriptions, discharge summaries, and health certificates, handled with attention to clinical terminology for insurance claims and second opinions.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["medical-documents"] },
  },
  {
    id: "immigration-docs",
    question: "Can you translate documents for a visa or immigration application?",
    answer:
      "Yes, we regularly translate birth certificates, marriage certificates, police clearance certificates, and other documents required for visa and immigration applications.",
    appliesTo: { service: ["translator", "translation"], documentCategory: ["personal-documents"] },
  },
  {
    id: "sworn-translator",
    question: "Are your translators certified or sworn translators?",
    answer:
      "Our translators are government-authorized and certified, and every translation carries a signed declaration of accuracy along with our company stamp.",
    appliesTo: { always: true },
  },
  {
    id: "language-pairs",
    question: "Do you only translate into English, or between other language pairs too?",
    answer:
      "Most requests are between a foreign or regional Indian language and English, but we also handle direct translation between two non-English languages on request.",
    appliesTo: { always: true },
  },
  {
    id: "sample-check",
    question: "Can I see a sample before committing to the full document?",
    answer:
      "For longer documents, we're happy to translate a short sample section first so you can review our terminology and style before we proceed with the rest.",
    appliesTo: { service: ["translator", "translation"] },
  },
  {
    id: "rush-service",
    question: "Do you offer rush or same-day service?",
    answer:
      "Same-day turnaround is available for most single-page and short documents, subject to language pair and current workload — let us know your deadline when you share the document.",
    appliesTo: { service: ["translator", "translation"] },
  },
];
