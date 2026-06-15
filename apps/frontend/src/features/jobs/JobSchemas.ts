import { DEPARTMENT_VALUES } from "@/enum/departments-enum";
import { EMPLOYMENT_TYPE_VALUES } from "@/enum/employment-types-enum";
import { EXPERIENCE_LEVEL_VALUES } from "@/enum/experience-levels-enum";
import { LOCATION_VALUES } from "@/enum/locations-enum";
import { z } from "zod";

export const jobRecruitmentSchema = z.object({
  jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),

  department: z.enum(DEPARTMENT_VALUES, {
    message: "Please select a valid Department",
  }),

  experienceLevel: z.enum(EXPERIENCE_LEVEL_VALUES, {
    message: "Please select a valid Experience Level",
  }),

  employmentType: z.enum(EMPLOYMENT_TYPE_VALUES, {
    message: "Please select a valid Employment Type",
  }),

  location: z.enum(LOCATION_VALUES, {
    message: "Please select a valid Location",
  }),

  companyName: z.string().min(2, "Company Name must be at least 2 characters"),

  companyDescription: z
    .string()
    .min(2, "Company Description must be at least 2 characters"),

  requiredSkills: z.array(z.string()).min(1, "Please add at least 1 skill"), // tối thiểu 1 skills

  benefits: z.array(z.string()), // optinal field
});

export type JobRecruitmentInput = z.infer<typeof jobRecruitmentSchema>;
