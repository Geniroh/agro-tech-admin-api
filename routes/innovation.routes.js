"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const innovation_controller_1 = require("../controllers/innovation.controller");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.verifyToken, innovation_controller_1.getAllInnovation);
router.get("/:id", authHandler_1.verifyToken, innovation_controller_1.getInnovationById);
router.patch("/update/:id", authHandler_1.verifyToken, innovation_controller_1.updateInnovationStatus);
exports.default = router;
