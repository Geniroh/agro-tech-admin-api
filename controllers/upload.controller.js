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
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const file_model_1 = __importDefault(require("../models/file.model"));
const s3Client = new client_s3_1.S3Client({
    region: "nyc3",
    endpoint: "https://nyc3.digitaloceanspaces.com",
    credentials: {
        accessKeyId: process.env.DO_SPACE_KEY,
        secretAccessKey: process.env.DO_SPACE_SECRET,
    },
});
function sanitizeFileName(fileName) {
    const extension = fileName.substring(fileName.lastIndexOf("."));
    const nameWithoutExtension = fileName
        .substring(0, fileName.lastIndexOf("."))
        .replace(/[^a-zA-Z0-9]/g, "");
    return nameWithoutExtension + extension;
}
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).send("No file uploaded.");
            return;
        }
        const { originalname, buffer, size } = req.file;
        const bucketName = process.env.DO_BUCKET_NAME;
        if (!bucketName) {
            return res.json({ error: "Bucket name not defined" });
        }
        // Sanitize file name and generate a unique file name
        const sanitizedFileName = sanitizeFileName(originalname);
        const uniqueFileName = `${sanitizedFileName}`;
        const params = {
            Bucket: bucketName,
            Key: uniqueFileName,
            Body: buffer,
            ACL: "public-read",
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3Client.send(command);
        const fileRecord = {
            name: originalname,
            size: size.toString(),
            url: `https://${bucketName}.nyc3.cdn.digitaloceanspaces.com/${uniqueFileName}`,
            uploadedAt: new Date(),
        };
        const newFile = yield file_model_1.default.create({
            filename: fileRecord.name,
            size: fileRecord.size,
            url: fileRecord.url,
        });
        res.status(200).json({
            message: "File uploaded successfully",
            file: newFile,
        });
    }
    catch (err) {
        console.error(err);
        return res.json({ error: "File upload failed" });
    }
});
exports.uploadFile = uploadFile;
