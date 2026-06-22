import type { SelectOption } from "@/types/common";

export const EMPLOYMENT_TYPE_VALUES = [
  "FullTime",
  "PartTime",
  "Contract",
  "Freelance",
  "Internship",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPE_VALUES)[number];

// value - label cho ui
export const EMPLOYMENT_TYPES: readonly SelectOption[] =
  EMPLOYMENT_TYPE_VALUES.map((val) => ({
    value: val,
    label: val,
  }));
