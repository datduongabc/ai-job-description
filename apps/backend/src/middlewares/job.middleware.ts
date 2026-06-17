import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsedData = schema.safeParse(req.body);

      req.body = parsedData;

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "FAIL",
          message: "Invalid input request. Please try again.",
          errors: error.flatten().fieldErrors,
        });

        return;
      }

      return next(error);
    }
  };
};
