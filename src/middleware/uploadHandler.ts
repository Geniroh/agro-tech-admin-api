import { Request, Response, NextFunction } from "express";

export const checkFileSize = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

  if (req.file && req.file.size > fileSizeLimit) {
    res.status(400).send("File is too large.");
    return;
  }

  next();
};
