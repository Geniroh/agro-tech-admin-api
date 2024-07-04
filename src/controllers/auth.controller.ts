import { NextFunction, Request, Response } from "express";
import Admin from "../models/admin.model";
import { registerAdminDto } from "../dto/admin";
import bcrypt from "bcryptjs";
import { ADMIN_ROLE } from "../enum/admin.enum";
import jwt from "jsonwebtoken";

// Generate access and refresh tokens
const generateTokens = (adminId: string) => {
  const accessToken = jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: "2d", // Access token expires in 2 days
  });

  const refreshToken = jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: "7d", // Refresh token expires in 7 days
  });

  return { accessToken, refreshToken };
};

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error, value } = await registerAdminDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(value.password, salt);

    const newAdmin = new Admin({
      ...value,
      password: hash,
      role: ADMIN_ROLE.ADMIN,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = await registerAdminDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    const admin = await Admin.findOne({ email: value.email });
    if (!admin) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (process.env.JWT_SECRET) {
      const { accessToken, refreshToken } = generateTokens(admin.id);

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        })
        .status(200)
        .json(admin);
    } else {
      next(new Error("No secret credential"));
    }
  } catch (err) {
    next(err);
  }
};

export const logoutAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token").clearCookie("refresh_token").json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
