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
    appliesTo: { documentCategory: ["legal-document-translation"] },
  },
  {
    id: "business-docs",
    question: "Do you translate business contracts and corporate documents?",
    answer:
      "Yes, we translate company profiles, contracts, business proposals, and trade documentation, tailored to your industry and audience.",
    appliesTo: { documentCategory: ["business-documents"] },
  },
  {
    id: "personal-docs",
    question: "Can you translate personal documents like birth or marriage certificates?",
    answer:
      "Yes, we provide certified translation of birth certificates, marriage certificates, ID documents, and other personal records accepted by visa and immigration authorities.",
    appliesTo: { documentCategory: ["personal-documents"] },
  },
  {
    id: "technical-docs",
    question: "Do you handle technical manuals and engineering documentation?",
    answer:
      "Yes, our technical translators accurately render user manuals, specifications, and engineering documentation for manufacturing and product teams.",
    appliesTo: { documentCategory: ["technical-manuals"] },
  },
  {
    id: "educational-docs",
    question: "Can you translate degrees, transcripts, and educational certificates?",
    answer:
      "Yes, we provide certified translations of degrees, transcripts, and school certificates accepted by universities, embassies, and immigration authorities.",
    appliesTo: { documentCategory: ["educational-certificates"] },
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
    appliesTo: { documentCategory: ["real-estate-documents"] },
  },
  {
    id: "government-paperwork",
    question: "Do you translate government forms and municipal paperwork?",
    answer:
      "Yes, we translate government application forms, municipal certificates, and licensing or registration documents, accepted by government offices and departments.",
    appliesTo: { documentCategory: ["government-paperwork"] },
  },
  {
    id: "translator-vs-interpreter",
    question: "What's the difference between a translator and an interpreter?",
    answer:
      "A translator works with written documents, while an interpreter provides real-time spoken language conversion for meetings, conferences, and events.",
    appliesTo: { always: true },
  },
];
