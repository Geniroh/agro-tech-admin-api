import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFile extends Document {
  filename: string;
  size: string;
  url: string;
}

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    size: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Files: Model<IFile> = mongoose.model<IFile>("files", fileSchema);

export default Files;
