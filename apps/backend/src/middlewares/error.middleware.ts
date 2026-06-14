import type { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Ghi log
  console.error("[ERROR]:", {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });

  // Che giấu Stack Trace khi chạy ở môi trường Production để bảo mật thông tin hạ tầng
  const isProduction = process.env.NODE_ENV === "production";
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: "ERROR",
    message:
      isProduction && statusCode === 500
        ? "Internal Server Error"
        : error.message,
    ...(!isProduction && { stack: error.stack }),
  });
}
