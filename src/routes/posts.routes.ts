import express from "express";
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.controller";
const router = express.Router();

router.post("/", addPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/edit/:id", updatePost);

export default router;
