import { Request, Response, NextFunction } from "express";
import { featuredPostsDto, updateFeaturedPostsDto } from "../dto/posts.dto";
import FeaturedPosts from "../models/featuredPosts.model";

export const addPost = async (req: Request, res: Response) => {
  try {
    const { error, value } = await featuredPostsDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    const newPosts = await FeaturedPosts.create(value);

    res.status(201).json(newPosts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    if (!postId) res.status(404).json({ error: "Post does not exists" });
    const { error, value } = await updateFeaturedPostsDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    const updatedPost = await FeaturedPosts.findByIdAndUpdate(postId, value, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
