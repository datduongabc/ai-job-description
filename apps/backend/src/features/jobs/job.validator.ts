import {
  DepartmentEnum,
  EmpTypeEnum,
  ExpLevelEnum,
  LocationEnum,
} from "@prisma/client";
import { z } from "zod";

const DEPARTMENTS = Object.values(DepartmentEnum) as [
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

export const JobRecruitmentSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(2, "[BE] Job title must be at least 2 characters"),
  // .max(50, "[BE] Job Title must be maximum 50 characters"),

  department: z.enum(DEPARTMENTS, {
    message: "[BE] Invalid department category",
  }),

  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    message: "[BE] Invalid experience level classification",
  }),

  employmentType: z.enum(EMPLOYMENT_TYPES, {
    message: "[BE] Invalid employment type specified",
  }),

  location: z.enum(LOCATIONS, {
    message: "[BE] Location is not supported",
  }),

  companyName: z
    .string()
    .trim()
    .min(2, "[BE] Company name must be at least 2 characters"),
  // .max(50, "[BE] Company Name must be maximum 50 characters"),

  companyDescription: z
    .string()
    .trim()
    .min(2, "[BE] Company description must be at least 2 characters"),
  // .max(100, "[BE] Company Description must be maximum 100 characters"),

  requiredSkills: z
    .array(z.string().trim().min(2, "[BE] Invalid input skill name"))
    .min(1, "[BE] At least one required skill is mandatory"),

  benefits: z.array(z.string().trim().min(2, "[BE] Invalid input benifits")),
});

export type JobRecruitmentInput = z.infer<typeof JobRecruitmentSchema>;
