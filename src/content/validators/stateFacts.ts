import type { StateInfo } from "../states";

/** Fails the build if any state record is missing the institutions the content
 *  engine depends on. Reports every problem at once, not just the first. */
export function assertStateFacts(states: StateInfo[]): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const state of states) {
    if (seen.has(state.slug)) errors.push(`duplicate state slug "${state.slug}"`);
    seen.add(state.slug);

    if (!state.officialLanguages || state.officialLanguages.length < 1) {
      errors.push(`${state.slug}: officialLanguages must have >= 1 entry`);
    }
    for (const field of ["registrationDept", "highCourt", "schoolBoard", "transportAuthority", "homeDeptAttestation"] as const) {
      if (!state[field]?.trim()) errors.push(`${state.slug}: ${field} is required`);
    }
    if (!state.industriesFallback || state.industriesFallback.length < 2) {
      errors.push(`${state.slug}: industriesFallback must have >= 2 entries`);
    }
    if (!state.economicNoteFallback?.trim()) {
      errors.push(`${state.slug}: economicNoteFallback is required`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(state.verifiedOn ?? "")) {
      errors.push(`${state.slug}: verifiedOn must be an ISO date (YYYY-MM-DD)`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`State data incomplete — ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  }
}
