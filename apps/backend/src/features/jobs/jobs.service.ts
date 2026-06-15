import { PrismaClient } from "@prisma/client";
import { JobRecruitmentInput } from "./jobs.validator.js";
import { generateJobMetadata } from "./providers/gemini.provider.js";

const prisma = new PrismaClient();

export async function createAIGeneratedJob(payload: JobRecruitmentInput) {
  const aiOutput = await generateJobMetadata(payload);

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

        companyId: company.id,

        aboutCompanyGenerated: aiOutput.aboutCompany,
        jobSummaryGenerated: aiOutput.jobSummary,
        responsibilities: aiOutput.responsibilities,
        requirementsGenerated: aiOutput.requirements,
        niceToHaveGenerated: aiOutput.niceToHave,
      },
    });

    // Lưu kết quả vào bảng interview_questions
    if (aiOutput.interviewQuestions && aiOutput.interviewQuestions.length > 0) {
      await tx.interviewQuestion.createMany({
        data: aiOutput.interviewQuestions.map((q) => ({
          jobDescriptionId: newJob.id,
          type: q.type,
          questionText: q.questionText,
        })),
      });
    }

    return newJob;
  });
}
