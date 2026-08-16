export interface Language {
  slug: string;
  name: string;
  nativeName?: string;
  /** Real, common reason this language needs translation/interpretation in India — keeps
   *  generated copy anchored on the service, never generic language trivia. */
  useCases?: string[];
  /** Subset of serviceCategories.ts slugs this language's use-cases disproportionately need. */
  documentFocus?: string[];
}

export const languages: Language[] = [
  { slug: "hindi", name: "Hindi", nativeName: "हिन्दी" },
  {
    slug: "punjabi",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    useCases: [
      "immigration and study-visa paperwork for the Punjabi diaspora in Canada, the UK, and Australia",
      "agricultural trade and business documentation",
    ],
    documentFocus: ["personal-documents", "business-documents"],
  },
  { slug: "kannad", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  {
    slug: "korean",
    name: "Korean",
    nativeName: "한국어",
    useCases: [
      "Korean manufacturing and automotive joint ventures with India",
      "HR and relocation paperwork for Korean companies operating in India",
    ],
    documentFocus: ["technical-manuals", "business-documents"],
  },
  { slug: "chinese", name: "Chinese", nativeName: "中文" },
  { slug: "japanese", name: "Japanese", nativeName: "日本語" },
  { slug: "french", name: "French", nativeName: "Français" },
  { slug: "german", name: "German", nativeName: "Deutsch" },
  { slug: "spanish", name: "Spanish", nativeName: "Español" },
  { slug: "portuguese", name: "Portuguese", nativeName: "Português" },
  { slug: "bulgarian", name: "Bulgarian", nativeName: "Български" },
  { slug: "czech", name: "Czech", nativeName: "Čeština" },
  { slug: "danish", name: "Danish", nativeName: "Dansk" },
  { slug: "dutch", name: "Dutch", nativeName: "Nederlands" },
  { slug: "finnish", name: "Finnish", nativeName: "Suomi" },
  { slug: "hungarian", name: "Hungarian", nativeName: "Magyar" },
  { slug: "italian", name: "Italian", nativeName: "Italiano" },
  { slug: "polish", name: "Polish", nativeName: "Polski" },
  { slug: "telugu", name: "Telugu", nativeName: "తెలుగు" },
  { slug: "bengali", name: "Bengali", nativeName: "বাংলা" },
  { slug: "tamil", name: "Tamil", nativeName: "தமிழ்" },
  { slug: "urdu", name: "Urdu", nativeName: "اردو" },
  { slug: "arabic", name: "Arabic", nativeName: "العربية" },
  { slug: "malayalam", name: "Malayalam", nativeName: "മലയാളം" },
  { slug: "gujarati", name: "Gujarati", nativeName: "ગુજરાતી" },
  { slug: "mandarin", name: "Mandarin", nativeName: "普通话" },
  { slug: "cantonese", name: "Cantonese", nativeName: "廣東話" },
];

export const languagesBySlug: Record<string, Language> = Object.fromEntries(
  languages.map((language) => [language.slug, language])
);

for (const reserved of ["locations", "services"]) {
  if (languagesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a language slug`);
  }
}
