import mongoose, { Document, Schema, Model } from "mongoose";

export interface IInnovation extends Document {
  id: string;
  productName: string;
  yearInvented: string;
  country: string;
  currency: string;
  cost: Number;
  userId: string;
  month: string;
  productChain: string[];
  productPhase: string;
  status: string;
  likes: Number;
  dislikes: Number;
  productUse: string;
  productDescription: string;
  productMedia: any[];
  isExample: Boolean;
  productExample: any[];
  productInstruction: any[];
  productInventor: any[];
  productSupplier: any[];
  productGuidelines: any[];
  isInstruction: boolean;
  isInventor: boolean;
  isSupplier: boolean;
  isHSEGuidelines: boolean;
  isGenderFriendly: boolean;
  productGenderDescription: string;
  createdAt: Date;
  updatedAt: Date;
  discussions: any[];
  reactions: any[];
}

const InnovationSchema = new Schema({
  productName: { type: String, required: true },
  yearInvented: { type: String, required: true },
  country: { type: String, required: true },
  currency: { type: String, default: "NG" },
  cost: { type: Number, default: null },
  userId: { type: String, required: true },
  month: { type: String, required: true },
  productChain: { type: [String], required: true },
  productPhase: { type: String, required: true },
  status: { type: String, default: "pending" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  productUse: { type: String, required: true },
  productDescription: { type: String, required: true },
  productMedia: { type: [mongoose.Schema.Types.Mixed], required: true },
  isExample: { type: Boolean, required: true },
  productExample: { type: [mongoose.Schema.Types.Mixed], default: [] },
  productInstruction: { type: [mongoose.Schema.Types.Mixed], default: [] },
  productInventor: { type: [mongoose.Schema.Types.Mixed], default: [] },
  productSupplier: { type: [mongoose.Schema.Types.Mixed], default: [] },
  productGuidelines: { type: [mongoose.Schema.Types.Mixed], default: [] },
  isInstruction: { type: Boolean, default: null },
  isInventor: { type: Boolean, default: null },
  isSupplier: { type: Boolean, default: null },
  isHSEGuidelines: { type: Boolean, default: null },
  isGenderFriendly: { type: Boolean, default: null },
  productGenderDescription: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  discussions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "InnovationDiscussion" },
  ],
  reactions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "InnovationReaction" },
  ],
});

const Innovation = mongoose.model("innovations", InnovationSchema);

export default Innovation;
