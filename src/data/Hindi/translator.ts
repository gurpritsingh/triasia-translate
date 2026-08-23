import type { PageContent } from "@/content/pageTemplates";
import { languagesBySlug } from "@/content/languages";
import { buildLanguagePairs } from "@/content/languagePairs";

const data: PageContent = {
  seoTitle: "Hindi Translation Services in India | Certified Hindi Translators",
  heading: "Certified Hindi Translation Services in India",
  subHeading:
    "Triasia global translation services is a govt approved Translation Agency in India. We provide Certified Hindi Translator Services in India for Legal Documents, Marriage Certificates, Educational Certificates, Driving Licenses, Visa & Immigration Documents, etc. Our Govt Authorized Hindi Translators assure 100% certified & legal Hindi Translation service with high accuracy at reasonable prices.",
  sections: [
    {
      heading: "Hindi Translation Services",
      body: "Triasia Global delivers professional Hindi translation services for individuals, businesses, and government agencies across India. Our certified Hindi translators handle everything from single-page certificates to large multi-document legal and corporate projects, with every translation reviewed for linguistic accuracy and formatting fidelity to the source document.",
    },
    {
      heading: "English to Hindi Translation Services",
      body: "We translate English documents into fluent, legally accurate Hindi for use with Indian courts, government departments, universities, and private institutions. Our English to Hindi translators preserve technical and legal terminology while producing Hindi text that reads naturally to native speakers.",
    },
    {
      heading: "Hindi to English Translation Services",
      body: "Our Hindi to English translation service converts Hindi-language certificates, contracts, and official records into certified English documents accepted by embassies, universities, immigration authorities, and courts in India and abroad. Every translation carries a signed certificate of accuracy.",
    },
    {
      heading: "Certified Hindi Document Translation",
      body: "From legal filings to medical reports, our government-authorized Hindi translators are experienced across the full range of document types that require certified translation in India.",
      items: [
        {
          heading: "Hindi Legal Document Translation",
          body: "Court judgments, affidavits, power of attorney, and property agreements translated with precise legal terminology for submission to courts and government offices.",
        },
        {
          heading: "Hindi Educational Certificate Translation",
          body: "Degree certificates, mark sheets, and transcripts translated for university admissions, credential evaluation, and employment verification.",
        },
        {
          heading: "Hindi Medical Document Translation",
          body: "Medical reports, prescriptions, and hospital records translated accurately for insurance claims, treatment abroad, and visa medical requirements.",
        },
        {
          heading: "Hindi Business Document Translation",
          body: "Contracts, MOUs, financial statements, and company registration documents translated for cross-border business and compliance filings.",
        },
        {
          heading: "Hindi Personal Document Translation",
          body: "Marriage certificates, birth certificates, driving licenses, and identity documents translated for visa, immigration, and legal use.",
        },
      ],
    },
    {
      heading: "Apostille Services for Hindi Documents",
      body: "Beyond certified translation, Triasia Global assists with apostille attestation for Hindi documents that need legal recognition in Hague Convention member countries. We coordinate notarization, state-level (HRD/SDM) attestation, and MEA apostille stamping, so your translated Hindi documents are ready for use abroad without extra runaround.",
      items: [
        {
          heading: "Educational Document Apostille",
          body: "Degree certificates, mark sheets, and diplomas apostilled through HRD attestation and the Ministry of External Affairs for study and work visas abroad.",
        },
        {
          heading: "Personal Document Apostille",
          body: "Birth certificates, marriage certificates, and affidavits apostilled for immigration, marriage registration, and residency applications overseas.",
        },
        {
          heading: "Commercial Document Apostille",
          body: "Company incorporation certificates, board resolutions, and power of attorney documents apostilled for international business transactions.",
        },
      ],
    },
    {
      heading: "Professional Hindi Translators",
      body: "Every Hindi translator on our team is government-authorized and native or near-native fluent, with subject-matter experience across legal, medical, technical, and academic domains. Translations are reviewed by a second linguist before certification, ensuring consistent quality across every document we deliver.",
    },
    {
      heading: "Why Choose Triasia Global for Hindi Translation?",
      body: "We combine certified accuracy, fast turnaround, and government-recognized credentials with transparent, reasonable pricing. Our Hindi translations are accepted by Indian courts, RTOs, universities, embassies, and immigration authorities, backed by ISO-certified quality processes and a 100% acceptance guarantee.",
    },
  ],
  languagePairs: {
    heading: "Hindi Translation Language Combinations",
    intro:
      "As a regional Indian language, Hindi documents can be translated into English or into any of the international languages we support — and English documents can be translated into Hindi. Explore the language pairs we offer below.",
    pairs: buildLanguagePairs(languagesBySlug.hindi),
  },
  faq: [
    {
      question: "Is Triasia Global's Hindi translation certified and accepted for official use?",
      answer:
        "Yes. Every Hindi translation includes a signed certificate of accuracy and is accepted by Indian courts, RTOs, universities, embassies, and immigration authorities.",
    },
    {
      question: "How long does certified Hindi translation take?",
      answer:
        "Most standard documents — certificates, licenses, short contracts — are delivered within 24–48 hours. Urgent same-day turnaround is available on request.",
    },
    {
      question: "Do you translate both English to Hindi and Hindi to English?",
      answer:
        "Yes, we provide certified translation in both directions — English to Hindi and Hindi to English — for legal, medical, business, and personal documents.",
    },
    {
      question: "Can you translate Hindi documents into languages other than English?",
      answer:
        "Yes. We translate Hindi documents into major international languages including German, French, Spanish, Chinese, Japanese, Korean, and more, for visa, immigration, and business use.",
    },
    {
      question: "What documents can you translate from Hindi?",
      answer:
        "We translate legal documents, marriage and birth certificates, educational certificates, driving licenses, medical records, business contracts, and visa or immigration paperwork.",
    },
    {
      question: "Do you also provide apostille services for Hindi documents?",
      answer:
        "Yes. Alongside certified translation, we handle notarization, HRD/SDM attestation, and MEA apostille stamping so your documents are ready for legal use in Hague Convention member countries.",
    },
  ],
};

export default data;
