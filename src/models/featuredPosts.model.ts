import mongoose, { Document, Schema, Model } from "mongoose";

const featuredPostsSchema = new Schema(
  {
    mediaUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    thumbnailImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedPosts = mongoose.model("featuredPosts", featuredPostsSchema);

export default FeaturedPosts;
