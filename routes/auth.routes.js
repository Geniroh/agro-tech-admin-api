"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registerAdmin);
router.post("/login", auth_controller_1.loginAdmin);
router.post("/logout", auth_controller_1.logoutAdmin);
router.get("/user", authHandler_1.verifyToken, auth_controller_1.authenticatedUser);
exports.default = router;