"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const edit_controller_1 = require("../controllers/edit.controller");
const router = express_1.default.Router();
router.post("/:id", edit_controller_1.updateRequest);
router.get("/", edit_controller_1.getAllRequest);
exports.default = router;
