"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileSize = void 0;
const checkFileSize = (req, res, next) => {
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
    if (req.file && req.file.size > fileSizeLimit) {
        res.status(400).send("File is too large.");
        return;
    }
    next();
};
exports.checkFileSize = checkFileSize;
