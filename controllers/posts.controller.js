"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.addPost = void 0;
const posts_dto_1 = require("../dto/posts.dto");
const featuredPosts_model_1 = __importDefault(require("../models/featuredPosts.model"));
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = yield posts_dto_1.featuredPostsDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        const newPosts = yield featuredPosts_model_1.default.create(value);
        res.status(201).json(newPosts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addPost = addPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield featuredPosts_model_1.default.find();
        res.status(200).json(allPosts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            res.status(400).json({ error: "Bad Request" });
        const post = yield featuredPosts_model_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId)
            res.status(404).json({ error: "Post does not exists" });
        const { error, value } = yield posts_dto_1.updateFeaturedPostsDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        const updatedPost = yield featuredPosts_model_1.default.findByIdAndUpdate(postId, value, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId)
            res.status(404).json({ error: "Post does not exists" });
        const deletePost = yield featuredPosts_model_1.default.findByIdAndDelete(postId);
        res.status(200).json(deletePost);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deletePost = deletePost;
