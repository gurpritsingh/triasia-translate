import type { Language } from "../languages";

/** Fails the build if any language record lacks the data the content engine needs.
 *  Reports every problem at once. */
export function assertLanguageFacts(languages: Language[]): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const language of languages) {
    if (seen.has(language.slug)) errors.push(`duplicate language slug "${language.slug}"`);
    seen.add(language.slug);

    if (language.origin !== "foreign" && language.origin !== "indian") {
      errors.push(`${language.slug}: origin must be "foreign" or "indian"`);
    }
    if (!language.script?.trim()) errors.push(`${language.slug}: script is required`);
    if (language.direction !== "ltr" && language.direction !== "rtl") {
      errors.push(`${language.slug}: direction must be "ltr" or "rtl"`);
    }
    if (!language.officialIn || language.officialIn.length < 1) {
      errors.push(`${language.slug}: officialIn must have >= 1 entry`);
    }
    if (!language.scriptNotes || language.scriptNotes.length < 1) {
      errors.push(`${language.slug}: scriptNotes must have >= 1 entry`);
    }
    if (!language.useCases || language.useCases.length < 2) {
      errors.push(`${language.slug}: useCases must have >= 2 entries`);
    }
    if (!language.documentFocus || language.documentFocus.length < 2) {
      errors.push(`${language.slug}: documentFocus must have >= 2 serviceCategories slugs`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Language data incomplete — ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  }
}
