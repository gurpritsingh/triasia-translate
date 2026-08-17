import { assertLanguageFacts } from "./validators/languageFacts";
import { assertNoBannedPhrases } from "./validators/prose";

export interface LanguageCorridor {
  country: string;
  direction: "inbound" | "outbound";
  reason: string;
}

export interface LanguageLegalisation {
  country: string;
  route: "apostille" | "embassy-attestation";
  verifiedOn: string;
}

export interface Language {
  slug: string;
  name: string;
  nativeName?: string;
  /** Drives the pair-archetype fork: foreign-corridor vs Indian state-native/interstate. */
  origin: "foreign" | "indian";
  script: string;
  direction: "ltr" | "rtl";
  /** Countries/states where the language is official or in wide official use. */
  officialIn: string[];
  /** Real, verifiable notes on working between this script and English — the highest-value
   *  field on the site; these are the sentences a content spinner cannot produce. */
  scriptNotes: string[];
  /** Real, common reason this language needs translation/interpretation in India — keeps
   *  generated copy anchored on the service, never generic language trivia. */
  useCases: string[];
  /** Subset of serviceCategories.ts slugs this language's use-cases disproportionately need. */
  documentFocus: string[];
  /** Only for origin: "foreign" — real, well-documented corridors. */
  corridors?: LanguageCorridor[];
  /** Legalisation route for the primary destination country. Omit rather than guess when a
   *  language spans multiple destinations with different routes (e.g. Arabic). */
  legalisation?: LanguageLegalisation;
  /** Real interpreting settings for this language pair. */
  interpretingSettings?: string[];
}

export const languages: Language[] = [
  {
    slug: "hindi",
    name: "Hindi",
    nativeName: "हिन्दी",
    origin: "indian",
    script: "Devanagari",
    direction: "ltr",
    officialIn: ["Uttar Pradesh", "Bihar", "Rajasthan", "Madhya Pradesh", "Haryana", "Uttarakhand", "Chhattisgarh", "Jharkhand", "Himachal Pradesh", "Delhi", "and the Union government"],
    scriptNotes: [
      "Hindi documents are written in the Devanagari script, and certified translations use the spelling already on the client's passport or ID rather than a fresh phonetic transliteration.",
      "Government-issued Hindi certificates are often bilingual (Hindi and English); the translation covers the Hindi portion and preserves the original layout for side-by-side comparison.",
    ],
    useCases: ["pan-India government, court and educational paperwork", "personal and civil documents for domestic and overseas use"],
    documentFocus: ["personal-documents", "government-paperwork", "legal-document-translation"],
  },
  {
    slug: "punjabi",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    origin: "indian",
    script: "Gurmukhi",
    direction: "ltr",
    officialIn: ["Punjab", "Delhi (additional official language)"],
    scriptNotes: [
      "Punjabi land and revenue records are often handwritten in Gurmukhi in older registers; these are transcribed before translation, and unclear entries are flagged rather than guessed at.",
      "Gurmukhi and Shahmukhi both write Punjabi — documents from Pakistan use Shahmukhi (a Perso-Arabic script) and are handled as a separate case.",
    ],
    useCases: [
      "immigration and study-visa paperwork for the Punjabi diaspora in Canada, the UK, and Australia",
      "agricultural trade and business documentation",
    ],
    documentFocus: ["personal-documents", "business-documents"],
  },
  {
    slug: "kannad",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    origin: "indian",
    script: "Kannada",
    direction: "ltr",
    officialIn: ["Karnataka"],
    scriptNotes: [
      "Kannada academic transcripts and marksheets issued by Karnataka boards and universities are frequently bilingual; the translation covers the Kannada portion and mirrors the original formatting.",
      "Kannada land records (RTC/Pahani extracts) use revenue-department terminology that has a standard English rendering already used by Karnataka's own registration offices.",
    ],
    useCases: ["educational-credential translation for Karnataka university and board certificates", "property and land-record documentation issued in Kannada"],
    documentFocus: ["educational-certificates", "real-estate-documents", "personal-documents"],
  },
  {
    slug: "korean",
    name: "Korean",
    nativeName: "한국어",
    origin: "foreign",
    script: "Hangul",
    direction: "ltr",
    officialIn: ["South Korea", "North Korea"],
    scriptNotes: [
      "Korean personal names are usually written family-name-first; the translation matches the spelling already on the client's passport rather than transliterating afresh, so it agrees with their other paperwork.",
      "Korean corporate documents frequently carry a company seal (도장) rather than a signature — the seal is described in the translation so the receiving office knows what it represents.",
    ],
    useCases: [
      "Korean manufacturing and automotive joint ventures with India",
      "HR and relocation paperwork for Korean companies operating in India",
    ],
    documentFocus: ["technical-manuals", "business-documents"],
    corridors: [{ country: "South Korea", direction: "inbound", reason: "Korean manufacturers and suppliers with plants and joint ventures in India" }],
    legalisation: { country: "South Korea", route: "apostille", verifiedOn: "2026-08-18" },
    interpretingSettings: ["factory audits and supplier inspections", "corporate meetings and negotiations", "training sessions for Korean technical staff"],
  },
  {
    slug: "chinese",
    name: "Chinese",
    nativeName: "中文",
    origin: "foreign",
    script: "Chinese (Simplified Han characters)",
    direction: "ltr",
    officialIn: ["China", "Singapore", "Taiwan (uses Traditional characters)"],
    scriptNotes: [
      "Mainland Chinese documents use simplified Han characters, while Taiwan and Hong Kong use traditional characters — the translation notes which form the source document uses.",
      "Chinese personal names are written family-name-first; the translation matches the spelling already used on the client's passport.",
    ],
    useCases: ["trade and manufacturing documentation for Chinese suppliers and joint ventures", "business registration and corporate paperwork"],
    documentFocus: ["business-documents", "technical-manuals"],
    corridors: [{ country: "China", direction: "inbound", reason: "Chinese suppliers, manufacturers and trading partners" }],
  },
  {
    slug: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    origin: "foreign",
    script: "Japanese (Kanji, Hiragana, Katakana)",
    direction: "ltr",
    officialIn: ["Japan"],
    scriptNotes: [
      "Japanese business documents typically carry a company seal (印鑑, hanko) rather than a handwritten signature — the seal is described in the translation so the receiving office understands what it represents.",
      "Japanese personal names are written family-name-first on official documents; the translation matches the spelling already used on the client's passport.",
    ],
    useCases: ["Japanese manufacturing and automotive joint ventures in India", "technical and engineering documentation for Japanese suppliers"],
    documentFocus: ["technical-manuals", "business-documents"],
    corridors: [{ country: "Japan", direction: "inbound", reason: "Japanese manufacturers and automotive suppliers operating in India" }],
    interpretingSettings: ["factory audits and supplier inspections", "corporate meetings and negotiations", "technical training sessions"],
  },
  {
    slug: "french",
    name: "French",
    nativeName: "Français",
    origin: "foreign",
    script: "Latin (with accented characters é, è, ê, ç)",
    direction: "ltr",
    officialIn: ["France", "Canada (Quebec)", "Belgium", "Switzerland", "several African countries"],
    scriptNotes: [
      "French accented characters (é, è, ê, ç, ô) are preserved exactly as they appear in the source document, including in personal names, since dropping accents can create a mismatch with other identity documents.",
      "French educational transcripts use a grading scale different from the Indian system; the translation reproduces the original grades rather than converting them, since conversion is the receiving institution's decision.",
    ],
    useCases: ["study-visa and university-admission paperwork for France and Canada", "business expansion and trade documentation", "personal and civil documents"],
    documentFocus: ["educational-certificates", "business-documents", "personal-documents"],
    corridors: [
      { country: "France", direction: "outbound", reason: "Indian students and professionals applying to French institutions and employers" },
      { country: "Canada", direction: "outbound", reason: "Francophone immigration and study pathways" },
    ],
    legalisation: { country: "France", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "german",
    name: "German",
    nativeName: "Deutsch",
    origin: "foreign",
    script: "Latin (with ä, ö, ü, ß)",
    direction: "ltr",
    officialIn: ["Germany", "Austria", "Switzerland", "Liechtenstein"],
    scriptNotes: [
      "German compound nouns often have no single-word English equivalent; technical and legal terms are rendered with the German original retained in brackets where the receiving body expects it.",
      "The umlauted vowels ä, ö and ü are frequently transliterated as ae, oe and ue in passports and visa systems — the translation matches whichever form the client's existing documents use.",
    ],
    useCases: ["student-visa and university-admission paperwork for German institutions", "vocational training and nursing recruitment placements", "engineering and automotive supplier documentation"],
    documentFocus: ["educational-certificates", "technical-manuals", "personal-documents"],
    corridors: [{ country: "Germany", direction: "outbound", reason: "Indian students and skilled workers applying to German universities and employers" }],
    legalisation: { country: "Germany", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "spanish",
    name: "Spanish",
    nativeName: "Español",
    origin: "foreign",
    script: "Latin (with ñ, á, é, í, ó, ú)",
    direction: "ltr",
    officialIn: ["Spain", "most of Latin America"],
    scriptNotes: [
      "The Spanish ñ and accented vowels are preserved exactly as written, including in personal names, so the translation matches the client's other identity documents.",
      "Spanish-language documents from Latin American countries follow different notarial and certification conventions than documents from Spain; the translation notes the issuing country.",
    ],
    useCases: ["business and trade documentation for Spain and Latin America", "study and work-visa paperwork"],
    documentFocus: ["business-documents", "personal-documents", "educational-certificates"],
    corridors: [{ country: "Spain", direction: "outbound", reason: "trade and business documentation for Spanish-speaking markets" }],
    legalisation: { country: "Spain", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    origin: "foreign",
    script: "Latin (with ã, ç, õ, á)",
    direction: "ltr",
    officialIn: ["Portugal", "Brazil", "Goa (historical administrative use)"],
    scriptNotes: [
      "Brazilian and European Portuguese differ in vocabulary and some grammar; the translation notes which variant the source document uses.",
      "Older Goan property and civil records from the Portuguese colonial period are sometimes written in Portuguese; these are handled with attention to period-specific administrative terminology.",
    ],
    useCases: ["Portugal citizenship and ancestry documentation, particularly for Goan families", "business documentation for Brazil and Portugal"],
    documentFocus: ["personal-documents", "business-documents", "legal-document-translation"],
    corridors: [{ country: "Portugal", direction: "outbound", reason: "Goan-origin citizenship and ancestry applications" }],
    legalisation: { country: "Portugal", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "bulgarian",
    name: "Bulgarian",
    nativeName: "Български",
    origin: "foreign",
    script: "Cyrillic",
    direction: "ltr",
    officialIn: ["Bulgaria"],
    scriptNotes: ["Bulgarian is written in the Cyrillic alphabet; personal names are transliterated to match the Latin spelling already used on the client's passport rather than a fresh phonetic rendering."],
    useCases: ["study and work-visa paperwork for Bulgaria", "personal and civil documents"],
    documentFocus: ["personal-documents", "educational-certificates"],
    legalisation: { country: "Bulgaria", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "czech",
    name: "Czech",
    nativeName: "Čeština",
    origin: "foreign",
    script: "Latin (with č, š, ž, ě, ř)",
    direction: "ltr",
    officialIn: ["Czech Republic"],
    scriptNotes: ["Czech uses diacritical marks (č, š, ž, ř) that are preserved exactly as written, including in personal names, to match the client's other identity documents."],
    useCases: ["study and work-visa paperwork for the Czech Republic", "business and manufacturing documentation"],
    documentFocus: ["personal-documents", "business-documents"],
    legalisation: { country: "Czech Republic", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "danish",
    name: "Danish",
    nativeName: "Dansk",
    origin: "foreign",
    script: "Latin (with æ, ø, å)",
    direction: "ltr",
    officialIn: ["Denmark"],
    scriptNotes: ["Danish uses the additional letters æ, ø and å, preserved exactly as written including in personal names."],
    useCases: ["study-visa and university-admission paperwork for Denmark", "business documentation"],
    documentFocus: ["educational-certificates", "business-documents"],
    legalisation: { country: "Denmark", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "dutch",
    name: "Dutch",
    nativeName: "Nederlands",
    origin: "foreign",
    script: "Latin",
    direction: "ltr",
    officialIn: ["Netherlands", "Belgium (Flanders)"],
    scriptNotes: ["Dutch compound words are common in technical and legal documents; the translation renders them as their full English equivalent rather than a literal word-by-word split."],
    useCases: ["study-visa and business paperwork for the Netherlands", "technical documentation for Dutch suppliers"],
    documentFocus: ["business-documents", "technical-manuals", "educational-certificates"],
    legalisation: { country: "Netherlands", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "finnish",
    name: "Finnish",
    nativeName: "Suomi",
    origin: "foreign",
    script: "Latin (with ä, ö)",
    direction: "ltr",
    officialIn: ["Finland"],
    scriptNotes: ["Finnish personal and place names use ä and ö, preserved exactly as written to match the client's other identity documents."],
    useCases: ["study-visa paperwork for Finnish universities", "business and technical documentation"],
    documentFocus: ["educational-certificates", "business-documents"],
    legalisation: { country: "Finland", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "hungarian",
    name: "Hungarian",
    nativeName: "Magyar",
    origin: "foreign",
    script: "Latin (with ő, ű, á, é, í, ó, ö, ú, ü)",
    direction: "ltr",
    officialIn: ["Hungary"],
    scriptNotes: ["Hungarian personal names are traditionally written family-name-first on official documents; the translation matches the order already used on the client's passport."],
    useCases: ["study and work-visa paperwork for Hungary", "business documentation"],
    documentFocus: ["personal-documents", "business-documents"],
    legalisation: { country: "Hungary", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "italian",
    name: "Italian",
    nativeName: "Italiano",
    origin: "foreign",
    script: "Latin (with à, è, é, ì, ò, ù)",
    direction: "ltr",
    officialIn: ["Italy", "Switzerland (partial)"],
    scriptNotes: ["Italian legal and notarial documents use standard civil-law terminology; the translation renders it with the closest accepted English legal equivalent rather than a literal translation."],
    useCases: ["study-visa and business paperwork for Italy", "personal and family documents"],
    documentFocus: ["business-documents", "personal-documents", "educational-certificates"],
    legalisation: { country: "Italy", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "polish",
    name: "Polish",
    nativeName: "Polski",
    origin: "foreign",
    script: "Latin (with ą, ć, ę, ł, ń, ó, ś, ź, ż)",
    direction: "ltr",
    officialIn: ["Poland"],
    scriptNotes: ["Polish uses several diacritical marks not found in standard Latin script; these are preserved exactly as written, including in personal names."],
    useCases: ["study and work-visa paperwork for Poland", "manufacturing and logistics documentation"],
    documentFocus: ["personal-documents", "business-documents"],
    legalisation: { country: "Poland", route: "apostille", verifiedOn: "2026-08-18" },
  },
  {
    slug: "telugu",
    name: "Telugu",
    nativeName: "తెలుగు",
    origin: "indian",
    script: "Telugu",
    direction: "ltr",
    officialIn: ["Andhra Pradesh", "Telangana"],
    scriptNotes: [
      "Telugu marksheets and degree certificates issued by Andhra Pradesh and Telangana boards are commonly bilingual; the translation covers the Telugu portion and matches the certificate's layout.",
      "Telugu family and property names sometimes have multiple accepted English spellings — the translation follows the spelling already used on the client's passport or prior documents.",
    ],
    useCases: ["educational-credential translation for Andhra Pradesh and Telangana certificates", "property documentation for the Hyderabad and Vijayawada real-estate markets", "employment paperwork for the Gulf"],
    documentFocus: ["educational-certificates", "real-estate-documents", "personal-documents"],
  },
  {
    slug: "bengali",
    name: "Bengali",
    nativeName: "বাংলা",
    origin: "indian",
    script: "Bengali (Bangla)",
    direction: "ltr",
    officialIn: ["West Bengal", "Tripura", "Bangladesh"],
    scriptNotes: [
      "Bengali is written in both India and Bangladesh with the same script but different official document formats and government letterheads; the issuing country is noted on the translation so the receiving office isn't left guessing.",
      "Bengali civil and land records from older West Bengal registers are sometimes handwritten; unclear entries are flagged rather than guessed at.",
    ],
    useCases: ["cross-border trade and travel documentation with Bangladesh", "personal and land-record documents for West Bengal and Tripura residents relocating elsewhere in India"],
    documentFocus: ["personal-documents", "business-documents", "government-paperwork"],
  },
  {
    slug: "tamil",
    name: "Tamil",
    nativeName: "தமிழ்",
    origin: "indian",
    script: "Tamil",
    direction: "ltr",
    officialIn: ["Tamil Nadu", "Puducherry", "Sri Lanka", "Singapore"],
    scriptNotes: [
      "Tamil marksheets and certificates issued by Tamil Nadu state boards are frequently bilingual; the translation covers the Tamil portion and reproduces the layout so page-by-page comparison is straightforward.",
      "Tamil personal names are sometimes recorded without a distinct surname field on older documents — the translation follows the naming convention already used on the client's passport.",
    ],
    useCases: ["employment paperwork for Singapore, Malaysia and the Gulf", "state-issued certificates presented to central-government and overseas bodies"],
    documentFocus: ["educational-certificates", "personal-documents", "government-paperwork"],
  },
  {
    slug: "urdu",
    name: "Urdu",
    nativeName: "اردو",
    origin: "indian",
    script: "Perso-Arabic (Nastaliq)",
    direction: "rtl",
    officialIn: ["Telangana", "Jammu and Kashmir", "Delhi (additional official language)", "and widely used across North India"],
    scriptNotes: [
      "Urdu is written right-to-left in the Nastaliq style; certified translations are laid out to mirror the original page rather than reflow it, which matters when an office compares the two side by side.",
      "Older Urdu-language property and family documents sometimes use administrative terminology that has since changed; the translation notes the modern equivalent where useful.",
    ],
    useCases: ["personal and family documents for older records issued in Urdu", "property and inheritance paperwork"],
    documentFocus: ["personal-documents", "real-estate-documents", "legal-document-translation"],
  },
  {
    slug: "arabic",
    name: "Arabic",
    nativeName: "العربية",
    origin: "foreign",
    script: "Arabic",
    direction: "rtl",
    officialIn: ["the United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Egypt", "and other Arabic-speaking countries"],
    scriptNotes: [
      "Arabic is written right-to-left, so certified translations are laid out to mirror the original page rather than reflow it — useful when an office compares the two side by side.",
      "Arabic has no capital letters and several English sounds have no direct equivalent, so name spellings vary between documents; the translation matches the spelling already used on the client's passport.",
    ],
    useCases: ["employment and family-visa paperwork for the Gulf", "commercial and trade documentation for Gulf importers"],
    documentFocus: ["personal-documents", "business-documents", "educational-certificates"],
    corridors: [{ country: "the Gulf states", direction: "outbound", reason: "Indian workers and businesses with employment and trade ties to the Gulf" }],
    // Deliberately no `legalisation`: the route differs by destination country (some Gulf
    // states are Hague Convention parties, some require embassy attestation), and it changes
    // over time — see the hedging helper in the content engine rather than guessing here.
  },
  {
    slug: "malayalam",
    name: "Malayalam",
    nativeName: "മലയാളം",
    origin: "indian",
    script: "Malayalam",
    direction: "ltr",
    officialIn: ["Kerala", "Lakshadweep"],
    scriptNotes: [
      "Malayalam educational and personal certificates issued by Kerala boards are frequently bilingual; the translation covers the Malayalam portion and mirrors the original layout.",
      "Malayalam personal names often include a house name or place name as part of the full name — the translation preserves the structure already used on the client's passport.",
    ],
    useCases: ["Gulf employment and family-visa paperwork", "educational-credential translation for Kerala university and board certificates"],
    documentFocus: ["personal-documents", "educational-certificates", "government-paperwork"],
  },
  {
    slug: "gujarati",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    origin: "indian",
    script: "Gujarati",
    direction: "ltr",
    officialIn: ["Gujarat", "Dadra and Nagar Haveli and Daman and Diu"],
    scriptNotes: [
      "Gujarati commercial and trade documents frequently use terminology specific to Gujarat's registration and commerce departments; the translation follows the standard English rendering those offices already use.",
      "Gujarati property and family documents are matched to the spelling already used on the client's passport, since NRI clients often hold documents issued years apart.",
    ],
    useCases: ["NRI property, inheritance and family documents for the Gujarati diaspora", "import-export and trade paperwork"],
    documentFocus: ["business-documents", "real-estate-documents", "personal-documents"],
  },
  {
    slug: "mandarin",
    name: "Mandarin",
    nativeName: "普通话",
    origin: "foreign",
    script: "Chinese (Simplified Han characters)",
    direction: "ltr",
    officialIn: ["China", "Singapore", "Taiwan (uses Traditional characters)"],
    scriptNotes: [
      "Mandarin is written using simplified Han characters in mainland China and Singapore; Taiwan and Hong Kong use traditional characters, and the translation notes which form the source document uses.",
      "Mandarin personal names are written family-name-first; the translation matches the spelling already used on the client's passport.",
    ],
    useCases: ["trade and manufacturing documentation for Chinese suppliers", "business registration paperwork"],
    documentFocus: ["business-documents", "technical-manuals"],
    corridors: [{ country: "China", direction: "inbound", reason: "Chinese manufacturers, suppliers and trading partners" }],
  },
  {
    slug: "cantonese",
    name: "Cantonese",
    nativeName: "廣東話",
    origin: "foreign",
    script: "Chinese (Traditional Han characters, as used in Hong Kong)",
    direction: "ltr",
    officialIn: ["Hong Kong", "Macau", "Guangdong province"],
    scriptNotes: [
      "Cantonese documents from Hong Kong typically use traditional Han characters, distinct from the simplified characters used in mainland China; the translation notes which form applies.",
      "Cantonese personal names are written family-name-first; Hong Kong passports often carry a separate English name alongside the Chinese name, and the translation matches whichever form the client's passport uses.",
    ],
    useCases: ["trade and business documentation for Hong Kong", "personal and family documents"],
    documentFocus: ["business-documents", "personal-documents"],
    corridors: [{ country: "Hong Kong", direction: "inbound", reason: "Hong Kong trading partners and business contacts" }],
  },
];

export const languagesBySlug: Record<string, Language> = Object.fromEntries(
  languages.map((language) => [language.slug, language])
);

for (const reserved of ["locations", "services"]) {
  if (languagesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a language slug`);
  }
}

assertLanguageFacts(languages);

assertNoBannedPhrases(
  languages.flatMap((language) => [
    ...language.scriptNotes.map((note, i) => ({ field: `${language.slug}.scriptNotes[${i}]`, text: note })),
    ...language.useCases.map((useCase, i) => ({ field: `${language.slug}.useCases[${i}]`, text: useCase })),
  ])
);
