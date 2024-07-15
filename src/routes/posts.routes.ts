import express from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.controller";
const router = express.Router();

router.post("/", addPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/edit/:id", updatePost);
router.delete("/remove/:id", deletePost);

export default router;
