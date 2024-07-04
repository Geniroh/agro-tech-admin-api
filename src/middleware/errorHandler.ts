import { Request, Response, NextFunction } from "express";

export const handleErrorsMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    error: true,
    status: errorStatus,
    message: errorMessage,
  });
};
