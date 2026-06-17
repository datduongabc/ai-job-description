import type { NextFunction, Request, Response } from "express";
import { createAIGeneratedJob } from "./job.service.js";

export async function handleGenerateJob(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Gọi xuống AI function và xử lí business logic
    const cleanPayload = req.body;
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
