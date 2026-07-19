import type { DomainScore, EvidenceTag, Triple } from "../types";

export const t = (low: number, central: number, high: number): Triple => ({
  low,
  central,
  high,
});

export const ds = (
  low: number,
  central: number,
  high: number,
  evidence: EvidenceTag,
  note: string,
): DomainScore => ({ value: t(low, central, high), evidence, note });
