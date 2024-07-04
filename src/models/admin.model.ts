import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  phoneNumber?: string;
  password: string;
  role: string;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
