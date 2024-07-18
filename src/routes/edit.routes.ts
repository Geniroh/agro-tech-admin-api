import express from "express";
import { getAllRequest, updateRequest } from "../controllers/edit.controller";
const router = express.Router();

router.post("/:id", updateRequest);
router.get("/", getAllRequest);

export default router;
