import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({
        status: "FAIL",
        message: "Invalid input request. Please try again.",
        errors: parsedData.error.flatten().fieldErrors,
      });

      return;
    }

    req.body = parsedData.data;

    return next();
  };
};
