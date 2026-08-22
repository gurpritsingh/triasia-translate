/**
 * Banned-phrase lint for authored prose. Catches unverifiable claims before they ship on
 * thousands of pages — a wrong superlative or a fabricated statistic is a much bigger
 * problem repeated 6,000 times than it is once.
 *
 * Applied to every new prose field (states.ts, cities.ts, languages.ts) as it's authored.
 * NOT yet applied to pre-existing copy (pageTemplates.ts's cityVariants, the src/data/*
 * hub files, Footer.astro, the Mumbai override) — those contain violations already live on
 * the site (e.g. "Mumbai's #1", "100% accuracy guarantees") that need their own fix and
 * verification pass rather than being silently swept in here.
 */

const BANNED: Array<[RegExp, string]> = [
  [/\b(#\s?1|no\.?\s?1|number one)\b/i, "ranking claim"],
  [/\b(best|cheapest|fastest|leading|top-rated|award-winning)\b/i, "unverifiable superlative"],
  [/\b\d{1,3}\s?%/, "statistic"],
  [/\b\d[\d,]*\+?\s+(clients|customers|projects|documents|years)\b/i, "volume/tenure claim"],
  [/\b(₹|Rs\.?|INR)\s?\d/, "price claim"],
  [/\bour\s+(office|branch|centre|center|team)\s+in\b/i, "false local-presence claim"],
  [/\b\d+\s+\w+\s+(Road|Street|Marg|Nagar|Lane|Avenue)\b/, "street address"],
  [/\b(guarantee[sd]?|100%\s+accura)/i, "absolute quality guarantee"],
  [/\b(\d+[\s-]?star|star rating|customer reviews?|client reviews?|highly rated)\b/i, "review claim"],
];

export interface ProseViolation {
  field: string;
  text: string;
  reason: string;
}

/** Scans one string; returns the reasons it fails, or an empty array if clean. */
export function bannedPhrasesIn(text: string): string[] {
  const hits: string[] = [];
  for (const [pattern, reason] of BANNED) {
    if (pattern.test(text)) hits.push(reason);
  }
  return hits;
}

/** Scans a set of {field, text} pairs (e.g. every prose field on every city record) and
 *  throws with every violation listed, so a bulk data-entry pass fails loudly and once. */
export function assertNoBannedPhrases(entries: Array<{ field: string; text: string }>): void {
  const violations: ProseViolation[] = [];
  for (const { field, text } of entries) {
    for (const reason of bannedPhrasesIn(text)) {
      violations.push({ field, text, reason });
    }
  }
  if (violations.length > 0) {
    const lines = violations.map((v) => `${v.field}: ${v.reason} — "${v.text}"`);
    throw new Error(`Banned phrases found — ${violations.length} problem(s):\n  ${lines.join("\n  ")}`);
  }
}
