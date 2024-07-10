"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invite_controller_1 = require("../controllers/invite.controller");
const router = express_1.default.Router();
router.post("/", invite_controller_1.inviteAdmin);
router.get("/check/:id", invite_controller_1.checkInviteToken);
exports.default = router;
