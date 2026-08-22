import { hashString } from "./pageTemplates";

/**
 * Deterministic per-slot variant selection. `seedKey` is the page's own canonical
 * URL path; `salt` identifies the content slot (e.g. "faq-2-answer") so each slot
 * picks independently — a page doesn't get one "style," it gets an independent
 * roll per sentence, which is what keeps the combination space large enough that
 * two pages reading identically is astronomically unlikely.
 *
 * Stability contract: pure function of (seedKey, salt, current pool contents) — no
 * timestamp, no build-time randomness, so a rebuild without pool edits reproduces
 * byte-identical output. Editing a pool's contents later (add/remove/reorder) can
 * reassign `hash % pool.length` for OTHER pages sharing that pool, not just the
 * page you meant to change — an inherent property of modulo bucketing, not a bug.
 */
export function pickVariant<T>(seedKey: string, salt: string, variants: readonly T[]): T {
  return variants[hashString(`${seedKey}::${salt}`) % variants.length];
}

/** Deterministic Fisher-Yates shuffle, seeded the same way as pickVariant. */
export function pickOrder<T>(seedKey: string, salt: string, items: readonly T[]): T[] {
  const arr = [...items];
  let seed = hashString(`${seedKey}::${salt}`) || 1;
  const next = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return seed;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
