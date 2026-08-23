import type { PageContent } from "@/content/pageTemplates";
import { languagesBySlug } from "@/content/languages";
import { buildLanguagePairs } from "@/content/languagePairs";

const data: PageContent = {
  seoTitle: "Chinese Translation Services in Mumbai | Certified Chinese Translators",
  heading: "Certified Chinese Translation Services in Mumbai",
  subHeading:
    "Triasia Global is a govt approved Translation Agency providing Certified Chinese Translator Services in Mumbai for Business Contracts, Legal Documents, Visa & Immigration Paperwork, Educational Certificates, etc. Our Govt Authorized Chinese Translators in Mumbai assure 100% certified & legal Chinese Translation service with high accuracy at reasonable prices for companies and individuals across Maharashtra.",
  sections: [
    {
      heading: "Chinese Translation Services in Mumbai",
      body: "Triasia Global delivers professional Chinese translation services for importers, exporters, manufacturers, and individuals across Mumbai and the wider Maharashtra region. Our certified Chinese translators handle everything from single-page certificates to large multi-document trade and legal projects, reviewed for accuracy and formatting fidelity to the source document.",
    },
    {
      heading: "English to Chinese Translation Services in Mumbai",
      body: "We translate English business and legal documents into fluent, accurate Chinese for use with suppliers, manufacturers, and partners in China and Hong Kong. Our English to Chinese translators preserve technical and contractual terminology while producing Chinese text that reads naturally to native speakers.",
    },
    {
      heading: "Chinese to English Translation Services in Mumbai",
      body: "Our Chinese to English translation service converts Chinese-language contracts, invoices, and official records into certified English documents accepted by Indian customs, banks, courts, and government authorities in Mumbai.",
    },
    {
      heading: "Certified Chinese Document Translation in Mumbai",
      body: "Mumbai's trade and manufacturing ties with China mean our Chinese translators are experienced across the full range of document types local businesses and individuals need certified.",
      items: [
        {
          heading: "Chinese Legal Document Translation",
          body: "Contracts, agreements, and legal notices translated with precise terminology for submission to Indian courts and regulatory authorities.",
        },
        {
          heading: "Chinese Business & Trade Document Translation",
          body: "Invoices, purchase orders, shipping documents, and supplier agreements translated for import-export businesses operating through Mumbai's ports.",
        },
        {
          heading: "Chinese Educational Certificate Translation",
          body: "Degree certificates and transcripts translated for university admissions, credential evaluation, and employment verification.",
        },
        {
          heading: "Chinese Visa & Immigration Document Translation",
          body: "Identity documents, invitation letters, and supporting paperwork translated for visa applications and immigration processes.",
        },
        {
          heading: "Chinese Technical & Manufacturing Document Translation",
          body: "Product specifications, manuals, and quality certificates translated for manufacturers sourcing from or supplying to Chinese partners.",
        },
      ],
    },
    {
      heading: "Apostille Services for Chinese Documents in Mumbai",
      body: "China's accession to the Hague Apostille Convention in November 2023 means documents can now move between India and China with a single apostille instead of multi-step embassy legalisation. Triasia Global coordinates certified Chinese translation together with notarization, state-level attestation, and MEA apostille stamping for documents traveling in either direction.",
      items: [
        {
          heading: "Business Document Apostille",
          body: "Company incorporation certificates, board resolutions, and commercial invoices apostilled for trade and supplier agreements between Mumbai and Chinese partners.",
        },
        {
          heading: "Educational Document Apostille",
          body: "Degree certificates and transcripts apostilled for university admissions and employment verification between India and China.",
        },
        {
          heading: "Personal Document Apostille",
          body: "Birth certificates, marriage certificates, and affidavits apostilled for visa, residency, and family-related applications.",
        },
      ],
    },
    {
      heading: "Professional Chinese Translators in Mumbai",
      body: "Every Chinese translator on our Mumbai team is government-authorized and native or near-native fluent, with subject-matter experience across trade, legal, technical, and academic domains. Translations are reviewed by a second linguist before certification.",
    },
    {
      heading: "Why Choose Triasia Global for Chinese Translation in Mumbai?",
      body: "We combine certified accuracy, fast turnaround, and government-recognized credentials with transparent, reasonable pricing. Our Chinese translations are accepted by Indian courts, customs authorities, universities, and embassies, backed by ISO-certified quality processes and a 100% acceptance guarantee.",
    },
  ],
  languagePairs: {
    heading: "Chinese Translation Language Pairs",
    intro:
      "As an international language, Chinese translation with Triasia Global is offered between Chinese and English — the language pair required for legal, business, and immigration use in India.",
    pairs: buildLanguagePairs(languagesBySlug.chinese),
  },
  faq: [
    {
      question: "Is Triasia Global's Chinese translation certified and accepted for official use in Mumbai?",
      answer:
        "Yes. Every Chinese translation includes a signed certificate of accuracy and is accepted by Indian courts, customs authorities, banks, and immigration offices in Mumbai.",
    },
    {
      question: "How long does certified Chinese translation take in Mumbai?",
      answer:
        "Most standard documents — certificates, contracts, invoices — are delivered within 24–48 hours. Urgent same-day turnaround is available for time-sensitive trade or visa deadlines.",
    },
    {
      question: "Do you translate both English to Chinese and Chinese to English?",
      answer:
        "Yes, we provide certified translation in both directions — English to Chinese and Chinese to English — for business, legal, and personal documents.",
    },
    {
      question: "Can you translate directly between Chinese and Hindi?",
      answer:
        "We route Chinese translations through certified English, our working pair for all foreign-language documents, which is the format accepted by Indian courts, customs, and government offices.",
    },
    {
      question: "What documents can you translate from Chinese in Mumbai?",
      answer:
        "We translate business contracts, invoices, shipping and customs paperwork, legal documents, educational certificates, and visa or immigration paperwork.",
    },
    {
      question: "Do you provide apostille services for Chinese documents in Mumbai?",
      answer:
        "Yes. Since China joined the Hague Apostille Convention in November 2023, we coordinate notarization, state attestation, and MEA apostille stamping alongside certified translation for documents moving between India and China.",
    },
  ],
};

export default data;
