import express from "express";
import { uploadFile } from "../controllers/upload.controller";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

export default router;
