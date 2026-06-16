import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";

export const validateBody = (schema: ZodTypeAny) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const parsedData = await schema.parseAsync(req.body);
      req.body = parsedData;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "FAIL",
          message: "Data bypass middleware failed.",
          errors: error.flatten().fieldErrors,
        });
        return;
      }

      return next(error);
    }
  };
};
