import { NextFunction, Request, Response } from "express";
import { CodedError } from "utils/codedError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CodedError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message,
  });
};
