"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsMiddleware = void 0;
const handleErrorsMiddleware = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        error: true,
        status: errorStatus,
        message: errorMessage,
    });
};
exports.handleErrorsMiddleware = handleErrorsMiddleware;
