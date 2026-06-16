import type { NextFunction, Request, Response } from "express";
import { aiGenerationOutputSchema } from "./ai.validator.js";
import { createAIGeneratedJob } from "./jobs.service.js";
import { JobRecruitmentSchema } from "./jobs.validator.js";

export async function handleGenerateJob(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // server validation
    const parseResult = JobRecruitmentSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        status: "FAIL",
        message: "Input validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    // Gọi xuống AI function và xử lí business logic
    const cleanPayload = parseResult.data;
    const result = await createAIGeneratedJob(cleanPayload);

    // validate dữ liệu kết quả AI trả về
    const aiParseResult = aiGenerationOutputSchema.safeParse(result);

    if (!aiParseResult.success) {
      res.status(502).json({
        status: "FAIL",
        message: "AI service returned json structure incorrectly.",
        errors: aiParseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const validatedAIOutput = aiParseResult.data;

    // Đóng gói payload và trả dữ liệu frontend
    res.status(201).json({
      status: "SUCCESS",
      message: "AI generate results successfully",
      data: validatedAIOutput,
    });
  } catch (error) {
    next(error);
  }
}
