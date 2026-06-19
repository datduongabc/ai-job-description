import type { NextFunction, Request, Response } from "express";
import { createAIGeneratedJob } from "./job.service.js";
import { JobRecruitmentInput } from "./job.validator.js";

export async function handleGenerateJob(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Gọi xuống AI function và xử lí business logic
    const cleanPayload = req.body as JobRecruitmentInput;
    const result = await createAIGeneratedJob(cleanPayload);

    // Đóng gói payload và trả dữ liệu frontend
    res.status(201).json({
      status: "SUCCESS",
      message: "AI generate results successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
