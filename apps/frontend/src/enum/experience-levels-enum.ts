import type { SelectOption } from "@/types/common";

export const EXPERIENCE_LEVEL_VALUES = [
  "Intern",
  "Fresher",
  "Junior",
  "MidLevel",
  "Senior",
  "Leader",
  "Manager",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_VALUES)[number];

// value - label cho ui
export const EXPERIENCE_LEVELS: readonly SelectOption[] =
  EXPERIENCE_LEVEL_VALUES.map((val) => ({
    value: val,
    label: val,
  }));
