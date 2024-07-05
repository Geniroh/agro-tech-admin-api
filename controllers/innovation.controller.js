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
exports.updateInnovationStatus = exports.getInnovationById = exports.getAllInnovation = void 0;
const innovation_model_1 = __importDefault(require("../models/innovation.model"));
const innovation_dto_1 = require("../dto/innovation.dto");
const getAllInnovation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInnovation = yield innovation_model_1.default.find();
        res.json(allInnovation).status(200);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllInnovation = getAllInnovation;
const getInnovationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const innovationId = req.params.id;
        if (!innovationId)
            res.status(404).json({ error: "Innovation not found" });
        const innovation = yield innovation_model_1.default.findById(innovationId);
        res.status(200).json(innovation);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getInnovationById = getInnovationById;
const updateInnovationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const innovationId = req.params.id;
        const { error, value } = yield innovation_dto_1.statusSchemaDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        if (!innovationId)
            res.status(400).json({ error: "Innovation not found! " });
        const newInnovation = yield innovation_model_1.default.findByIdAndUpdate(innovationId, {
            status: value.status,
        }, { new: true });
        res.status(201).json(newInnovation);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateInnovationStatus = updateInnovationStatus;
