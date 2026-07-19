import { ENERGY_USE_CASES } from "./energy";
import { MATERIALS_USE_CASES } from "./materials";
import { QSSC_USE_CASES } from "./qssc";
import type { UseCase } from "../types";

export { JURISDICTIONS } from "./jurisdictions";

export const USE_CASES: UseCase[] = [
  ...QSSC_USE_CASES,
  ...MATERIALS_USE_CASES,
  ...ENERGY_USE_CASES,
];
