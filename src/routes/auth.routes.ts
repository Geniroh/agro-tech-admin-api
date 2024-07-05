import express from "express";
import {
  authenticatedUser,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/authHandler";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/user", verifyToken, authenticatedUser);

export default router;
