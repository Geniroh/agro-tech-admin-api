import mongoose, { Document, Schema, Model } from "mongoose";

const editPostsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    innovationId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "editInnovation",
  }
);

const EditInnovation = mongoose.model("editInnovation", editPostsSchema);

export default EditInnovation;
