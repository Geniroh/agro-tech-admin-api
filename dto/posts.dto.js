"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeaturedPostsDto = exports.featuredPostsDto = void 0;
const joi_1 = __importDefault(require("joi"));
exports.featuredPostsDto = joi_1.default.object({
    imgUrl: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    tag: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.updateFeaturedPostsDto = joi_1.default.object({
    imgUrl: joi_1.default.string().optional(),
    title: joi_1.default.string().optional(),
    tag: joi_1.default.array().items(joi_1.default.string()).optional(),
});
