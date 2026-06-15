import {
  DepartmentEnum,
  EmpTypeEnum,
  ExpLevelEnum,
  LocationEnum,
} from "@prisma/client";
import { z } from "zod";

const BACKEND_DEPARTMENT_VALUES = Object.values(DepartmentEnum) as [
  DepartmentEnum,
  ...DepartmentEnum[],
];

const EXPERIENCE_LEVELS = Object.values(ExpLevelEnum) as [
  ExpLevelEnum,
  ...ExpLevelEnum[],
];

const EMPLOYMENT_TYPES = Object.values(EmpTypeEnum) as [
  EmpTypeEnum,
  ...EmpTypeEnum[],
];

const LOCATIONS = Object.values(LocationEnum) as [
  LocationEnum,
  ...LocationEnum[],
];

export const generateJobSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title must be at least 2 characters"),

  department: z.enum(BACKEND_DEPARTMENT_VALUES, {
    message: "Invalid department category",
  }),

  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    message: "Invalid experience level classification",
  }),

  employmentType: z.enum(EMPLOYMENT_TYPES, {
    message: "Invalid employment type specified",
  }),

  location: z.enum(LOCATIONS, {
    message: "Location is not supported within the network",
  }),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters"),

  companyDescription: z
    .string()
    .trim()
    .min(2, "Company description must be at least 2 characters"),

  requiredSkills: z
    .array(z.string().trim())
    .min(1, "At least one required skill is mandatory"),

  benefits: z.array(z.string().trim()).default([]),
});

export type JobRecruitmentInput = z.infer<typeof generateJobSchema>;
