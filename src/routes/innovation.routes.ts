import express from "express";
import {
  getAllInnovation,
  getInnovationById,
  updateInnovationStatus,
} from "../controllers/innovation.controller";
import { verifyToken } from "../middleware/authHandler";
const router = express.Router();

router.get("/", verifyToken, getAllInnovation);
router.get("/:id", verifyToken, getInnovationById);
router.patch("/update/:id", verifyToken, updateInnovationStatus);

export default router;
