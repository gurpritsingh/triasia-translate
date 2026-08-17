import type { City } from "./cities";
import type { Language } from "./languages";
import { statesBySlug } from "./states";

/**
 * The single largest available differentiator between pages: the 28 languages are not one
 * kind of thing, and this is derived from real data, never authored per page.
 *
 * - foreign-corridor: documents cross a border (Korean, German, Arabic...). The narrative is
 *   attestation/apostille chains, embassy acceptance, and cross-border business/visa paperwork.
 * - state-native: the language is official in the city's own state (Kannada in Bangalore,
 *   Tamil in Madurai). Source documents were issued in this script by these state authorities
 *   and need certified English translation to be used elsewhere.
 * - interstate: documents issued in another Indian state's language, presented to this city's
 *   authorities (an inter-state migrant/employee/student need).
 */
export type PairArchetype = "foreign-corridor" | "state-native" | "interstate";

export function resolveArchetype(language: Language, city?: City): PairArchetype {
  if (language.origin === "foreign") return "foreign-corridor";
  if (city) {
    const state = statesBySlug[city.stateSlug];
    if (state?.officialLanguages.includes(language.name)) return "state-native";
  }
  return "interstate";
}
