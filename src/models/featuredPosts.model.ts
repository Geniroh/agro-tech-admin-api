import mongoose, { Document, Schema, Model } from "mongoose";

const featuredPostsSchema = new Schema(
  {
    imgUrl: {
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
  },
  {
    timestamps: true,
  }
);

const FeaturedPosts = mongoose.model("featuredPosts", featuredPostsSchema);

export default FeaturedPosts;
