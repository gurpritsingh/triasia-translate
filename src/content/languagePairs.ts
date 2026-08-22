import { languages, type Language } from "./languages";

export interface LanguagePair {
  from: string;
  to: string;
}

const ENGLISH = "English";

/**
 * Which language-to-language combinations are worth advertising on a given
 * language's translator page, per the agency's rules:
 *  1. A regional (Indian) language can pair with English or with any foreign language.
 *  2. English can pair with a regional language.
 *  3. A foreign language can only pair with English — never with another foreign
 *     language, and never directly with a regional language.
 * Regional-to-regional is never offered (no combined city/language/language routes exist).
 */
export function buildLanguagePairs(language: Language): LanguagePair[] {
  const pairs: LanguagePair[] = [
    { from: language.name, to: ENGLISH },
    { from: ENGLISH, to: language.name },
  ];

  if (language.type === "regional") {
    for (const other of languages) {
      if (other.type === "foreign") {
        pairs.push({ from: language.name, to: other.name });
      }
    }
  }

  return pairs;
}
