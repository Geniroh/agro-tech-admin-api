import express from "express";
import {
  addPost,
  getPostById,
  updatePost,
} from "../controllers/posts.controller";
const router = express.Router();

router.post("/", addPost);
router.get("/:id", getPostById);
router.patch("/edit/:id", updatePost);

export default router;
