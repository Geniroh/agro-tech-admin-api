import express from "express";
import { uploadFile } from "../controllers/upload.controller";
import multer from "multer";
import { checkFileSize } from "../middleware/uploadHandler";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), checkFileSize, uploadFile);

export default router;
