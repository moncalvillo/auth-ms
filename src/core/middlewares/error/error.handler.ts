import { NextFunction, Request, Response } from "express";
import { CodedError } from "shared/customErros";

export const errorHandler = (
  err: CodedError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  if (err instanceof CodedError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};
