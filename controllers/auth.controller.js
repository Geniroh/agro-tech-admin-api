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
exports.logoutAdmin = exports.authenticatedUser = exports.loginAdmin = exports.registerAdmin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const admin_dto_1 = require("../dto/admin.dto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_enum_1 = require("../enum/admin.enum");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate access and refresh tokens
const generateTokens = (adminId) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: adminId }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Access token expires in 2 days
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: adminId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Refresh token expires in 7 days
    });
    return { accessToken, refreshToken };
};
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = yield admin_dto_1.registerAdminDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = bcryptjs_1.default.hashSync(value.password, salt);
        const newAdmin = new admin_model_1.default(Object.assign(Object.assign({}, value), { password: hash, role: admin_enum_1.ADMIN_ROLE.ADMIN }));
        const savedAdmin = yield newAdmin.save();
        res.status(201).json(savedAdmin);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = yield admin_dto_1.registerAdminDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        const admin = yield admin_model_1.default.findOne({ email: value.email });
        if (!admin) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(value.password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({
                error: "Incorrect login credentials",
            });
        }
        if (process.env.JWT_SECRET) {
            const { accessToken, refreshToken } = generateTokens(admin.id);
            res
                .cookie("access_token", accessToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })
                .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            })
                .status(200)
                .json({ user: admin, token: accessToken });
        }
        else {
            next(new Error("No secret credential"));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.loginAdmin = loginAdmin;
const authenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const userId = req.user.id;
            const admin = yield admin_model_1.default.findById(userId);
            if (admin) {
                res.status(200).json({ user: admin });
            }
            else {
                res.status(404).json({ error: "User not found" });
            }
        }
        else {
            res.status(401).json({ error: "Not authenticated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.authenticatedUser = authenticatedUser;
const logoutAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token").clearCookie("refresh_token").json({
            message: "Logout successful",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutAdmin = logoutAdmin;
