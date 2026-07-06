export interface Language {
  slug: string;
  name: string;
  nativeName?: string;
}

export const languages: Language[] = [
  { slug: "hindi", name: "Hindi", nativeName: "हिन्दी" },
  { slug: "punjabi", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { slug: "kannad", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { slug: "korean", name: "Korean", nativeName: "한국어" },
  { slug: "chinese", name: "Chinese", nativeName: "中文" },
];

export const languagesBySlug: Record<string, Language> = Object.fromEntries(
  languages.map((language) => [language.slug, language])
);

for (const reserved of ["locations", "services"]) {
  if (languagesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a language slug`);
  }
}
