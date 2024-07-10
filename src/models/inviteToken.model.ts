import mongoose, { Document, Schema, Model } from "mongoose";

const inviteTokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model("invitations", inviteTokenSchema);

export default Invitation;
