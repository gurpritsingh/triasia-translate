export interface Language {
  slug: string;
  name: string;
  nativeName?: string;
  /**
   * "regional" = an Indian regional language (can pair with English or any foreign
   * language). "foreign" = a non-Indian language (pairs only with English). Drives
   * the language-combination rules in `languagePairs.ts` — see that file for the
   * full rule set.
   */
  type: "regional" | "foreign";
}

export const languages: Language[] = [
  { slug: "hindi", name: "Hindi", nativeName: "हिन्दी", type: "regional" },
  { slug: "punjabi", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", type: "regional" },
  { slug: "korean", name: "Korean", nativeName: "한국어", type: "foreign" },
  { slug: "chinese", name: "Chinese", nativeName: "中文", type: "foreign" },
  { slug: "japanese", name: "Japanese", nativeName: "日本語", type: "foreign" },
  { slug: "french", name: "French", nativeName: "Français", type: "foreign" },
  { slug: "german", name: "German", nativeName: "Deutsch", type: "foreign" },
  { slug: "spanish", name: "Spanish", nativeName: "Español", type: "foreign" },
  { slug: "portuguese", name: "Portuguese", nativeName: "Português", type: "foreign" },
  { slug: "bulgarian", name: "Bulgarian", nativeName: "Български", type: "foreign" },
  { slug: "czech", name: "Czech", nativeName: "Čeština", type: "foreign" },
  { slug: "danish", name: "Danish", nativeName: "Dansk", type: "foreign" },
  { slug: "italian", name: "Italian", nativeName: "Italiano", type: "foreign" },
  { slug: "polish", name: "Polish", nativeName: "Polski", type: "foreign" },
  { slug: "telugu", name: "Telugu", nativeName: "తెలుగు", type: "regional" },
  { slug: "bengali", name: "Bengali", nativeName: "বাংলা", type: "regional" },
  { slug: "tamil", name: "Tamil", nativeName: "தமிழ்", type: "regional" },
  { slug: "urdu", name: "Urdu", nativeName: "اردو", type: "regional" },
  { slug: "arabic", name: "Arabic", nativeName: "العربية", type: "foreign" },
];

export const languagesBySlug: Record<string, Language> = Object.fromEntries(
  languages.map((language) => [language.slug, language])
);

for (const reserved of ["locations", "services"]) {
  if (languagesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a language slug`);
  }
}
