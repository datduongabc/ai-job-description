import { Prisma, PrismaClient } from "@prisma/client";
import { JobRecruitmentInput } from "./job.validator.js";
import { generateJobOutput } from "./providers/gemini.provider.js";

const prisma = new PrismaClient();

export async function createAIGeneratedJob(payload: JobRecruitmentInput) {
  try {
    const aiOutput = await generateJobOutput(payload);

    console.log(aiOutput);

    const savedJob = await prisma.jobDescription.create({
      data: {
        // input part
        jobTitle: payload.jobTitle,
        department: payload.department,
        experienceLevel: payload.experienceLevel,
        employmentType: payload.employmentType,
        location: payload.location,

        companyName: payload.companyName,
        companyDescription: payload.companyDescription,

        requiredSkills: payload.requiredSkills,
        benefits: payload.benefits,

        // ai output part
        aboutCompanyGenerated: aiOutput.aboutCompany,
        jobSummaryGenerated: aiOutput.jobSummary,
        responsibilities: aiOutput.responsibilities,
        requirementsGenerated: aiOutput.requirements,
        niceToHaveGenerated: aiOutput.niceToHave,
        interviewQuestions: aiOutput.interviewQuestions,
      },
    });

    return savedJob;
  } catch (error) {
    console.error("====== [CRITICAL DATABASE WRITE FAILURE] ======");
    console.error(error);
    console.error("===============================================");

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(
        `[Database Error] Mã lỗi: ${error.code} - Thao tác dữ liệu thất bại.`,
      );
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(
        "[Database Validation] Dữ liệu truyền vào sai cấu trúc so với schema.prisma.",
      );
    }

    throw new Error(
      "Lưu dữ liệu vào cơ sở dữ liệu thất bại do lỗi hệ thống hạ tầng.",
    );
  }
}
