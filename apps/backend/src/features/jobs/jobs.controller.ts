import type { NextFunction, Request, Response } from "express";
import { createAIGeneratedJob } from "./jobs.service.js";
import { generateJobSchema } from "./jobs.validator.js";

export async function handleGenerateJob(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Input validation
    const parseResult = generateJobSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        status: "FAIL",
        message: "Input validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    // Gọi service xử lí bussiness logic
    const cleanPayload = parseResult.data;
    const savedJobDescription = await createAIGeneratedJob(cleanPayload);

    // Đóng gói payload và trả dữ liệu frontend
    res.status(201).json({
      status: "SUCCESS",
      message: "AI generate results successfully",
      data: savedJobDescription,
    });
  } catch (error) {
    next(error);
  }
}
