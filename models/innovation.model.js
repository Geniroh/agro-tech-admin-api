"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const InnovationSchema = new mongoose_1.Schema({
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
    productMedia: { type: [mongoose_1.default.Schema.Types.Mixed], required: true },
    isExample: { type: Boolean, required: true },
    productExample: { type: [mongoose_1.default.Schema.Types.Mixed], default: [] },
    productInstruction: { type: [mongoose_1.default.Schema.Types.Mixed], default: [] },
    productInventor: { type: [mongoose_1.default.Schema.Types.Mixed], default: [] },
    productSupplier: { type: [mongoose_1.default.Schema.Types.Mixed], default: [] },
    productGuidelines: { type: [mongoose_1.default.Schema.Types.Mixed], default: [] },
    isInstruction: { type: Boolean, default: null },
    isInventor: { type: Boolean, default: null },
    isSupplier: { type: Boolean, default: null },
    isHSEGuidelines: { type: Boolean, default: null },
    isGenderFriendly: { type: Boolean, default: null },
    productGenderDescription: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    discussions: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "InnovationDiscussion" },
    ],
    reactions: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "InnovationReaction" },
    ],
});
const Innovation = mongoose_1.default.model("innovations", InnovationSchema);
exports.default = Innovation;
