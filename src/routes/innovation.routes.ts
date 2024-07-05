import express from "express";
import {
  getAllInnovation,
  getInnovationById,
  updateInnovationStatus,
} from "../controllers/innovation.controller";
const router = express.Router();

router.get("/", getAllInnovation);
router.get("/:id", getInnovationById);
router.patch("/update/:id", updateInnovationStatus);

export default router;
