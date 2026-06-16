import { PrismaClient } from "@prisma/client";
import { aiGenerationOutputSchema } from "./ai.validator.js";
import { JobRecruitmentInput } from "./jobs.validator.js";
import { generateJobMetadata } from "./providers/gemini.provider.js";

const prisma = new PrismaClient();

export async function createAIGeneratedJob(payload: JobRecruitmentInput) {
  const rawAiOutput = await generateJobMetadata(payload);
  const aiOutput = aiGenerationOutputSchema.parse(rawAiOutput);

  return await prisma.$transaction(async (tx) => {
    // Kiểm tra đã có công ty này trong table companies
    const company = await tx.company.upsert({
      where: {
        name: payload.companyName,
      },
      update: {
        description: payload.companyDescription,
      },
      create: {
        name: payload.companyName,
        description: payload.companyDescription,
      },
    });

    // Lưu kết quả vào bảng job_descriptions
    const newJob = await tx.jobDescription.create({
      data: {
        jobTitle: payload.jobTitle,
        department: payload.department,
        experienceLevel: payload.experienceLevel,
        employmentType: payload.employmentType,
        location: payload.location,

        requiredSkills: payload.requiredSkills,
        benefits: payload.benefits,

        companyId: company.id,

        aboutCompanyGenerated: aiOutput.aboutCompany,
        jobSummaryGenerated: aiOutput.jobSummary,
        responsibilities: aiOutput.responsibilities,
        requirementsGenerated: aiOutput.requirements,
        niceToHaveGenerated: aiOutput.niceToHave,

        // Lưu kết quả vào bảng interview_questions
        interviewQuestions: {
          create: aiOutput.interviewQuestions.map((q) => ({
            type: q.type,
            questionText: q.questionText,
          })),
        },
      },
      include: {
        interviewQuestions: true,
      },
    });

    return {
      aboutCompany: aiOutput.aboutCompany,
      jobSummary: aiOutput.jobSummary,
      responsibilities: aiOutput.responsibilities,
      requirements: aiOutput.requirements,
      niceToHave: aiOutput.niceToHave,
      benefits: aiOutput.benefits,

      interviewQuestions: newJob.interviewQuestions.map((q) => ({
        id: q.id,
        type: q.type,
        questionText: q.questionText,
      })),
    };
  });
}
