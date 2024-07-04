import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  const secret = process.env.JWT_SECRET;
  if (secret) {
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Token is not valid!" });
      req.user = user;
      next();
    });
  } else {
    next(new Error("No secret credential"));
  }
};

export const verifyUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user && (req.user as any).id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ error: "You are not authorized!" });
    }
  });
};
