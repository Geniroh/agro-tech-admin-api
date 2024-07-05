import express from "express";
import { addPost, updatePost } from "../controllers/posts.controller";
const router = express.Router();

router.post("/", addPost);
router.patch("/edit/:id", updatePost);

export default router;
