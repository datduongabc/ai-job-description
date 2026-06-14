import type { SelectOption } from "@/types/common";

export const DEPARTMENT_VALUES = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "QA",
  "DevOps",
  "Security",
] as const;

export type Department = (typeof DEPARTMENT_VALUES)[number];

// value - label cho ui
export const DEPARTMENTS: readonly SelectOption[] = DEPARTMENT_VALUES.map(
  (val) => ({
    value: val,
    label: val,
  }),
);
