"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }
    const token = authHeader.split(" ")[1]; // Remove "Bearer " from the token string
    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }
    const secret = process.env.JWT_SECRET;
    if (secret) {
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err)
                return res.status(403).json({ error: "Token is not valid!" });
            req.user = user;
            next();
        });
    }
    else {
        next(new Error("No secret credential"));
    }
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, (err) => {
        if (err)
            return next(err);
        if (req.user && req.user.id === req.params.id) {
            next();
        }
        else {
            return res.status(403).json({ error: "You are not authorized!" });
        }
    });
};
exports.verifyUser = verifyUser;
