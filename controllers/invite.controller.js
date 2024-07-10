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
exports.checkInviteToken = exports.inviteAdmin = void 0;
const mail_1 = require("../utils/mail");
const invitation_dto_1 = require("../dto/invitation.dto");
const uuid_1 = require("uuid");
const inviteToken_model_1 = __importDefault(require("../models/inviteToken.model"));
const inviteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = yield invitation_dto_1.emailInvitationSchemaDto.validate(req.body);
        if (error) {
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        }
        const { email } = value;
        const token = (0, uuid_1.v4)();
        const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        const existingToken = yield inviteToken_model_1.default.find({ email });
        if (existingToken) {
            yield inviteToken_model_1.default.deleteOne({ email });
        }
        const newToken = yield inviteToken_model_1.default.create({
            email,
            token,
            expires,
        });
        const response = yield (0, mail_1.sendMail)("Stavmia", email, token);
        res.status(200).json({ token: newToken, message: response });
    }
    catch (error) {
        res.status(500).json({ error: "Could not send invite" });
    }
});
exports.inviteAdmin = inviteAdmin;
const checkInviteToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email) {
            res.status(400).json({
                error: "Could not verify email",
            });
            return;
        }
        const tokenExists = yield inviteToken_model_1.default.findOne({ email });
        if (tokenExists) {
            const hasExpired = new Date(tokenExists.expires) < new Date();
            if (hasExpired) {
                res.json({ error: "Token has expired!" }).status(400);
                return;
            }
            res.json({ approve: true }).status(200);
        }
        else {
            res.json({ approve: false }).status(200);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not send invite" });
    }
});
exports.checkInviteToken = checkInviteToken;
