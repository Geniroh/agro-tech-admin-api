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
exports.getAllRequest = exports.updateRequest = void 0;
const edits_model_1 = __importDefault(require("../models/edits.model"));
const mail_1 = require("../utils/mail");
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Bad Request" });
        }
        const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        const updatedEdit = yield edits_model_1.default.findOneAndUpdate({ _id: id }, { expires, status: "approved" }, { new: true });
        if (!updatedEdit) {
            return res.status(404).json({ error: "Not Found" });
        }
        yield (0, mail_1.sendRequestApproval)(updatedEdit.email, updatedEdit.token);
        res.status(200).json(updatedEdit);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not update request" });
    }
});
exports.updateRequest = updateRequest;
const getAllRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield edits_model_1.default.find({ status: "unapprove" });
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(500).json({ error: "Could not get request" });
    }
});
exports.getAllRequest = getAllRequest;
