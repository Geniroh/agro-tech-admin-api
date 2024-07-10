"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const innovation_routes_1 = __importDefault(require("./routes/innovation.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const invite_routes_1 = __importDefault(require("./routes/invite.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(errorHandler_1.handleErrorsMiddleware);
app.use("/auth", auth_routes_1.default);
app.use("/innovation", innovation_routes_1.default);
app.use("/featured", posts_routes_1.default);
app.use("/upload", upload_routes_1.default);
app.use("/invite", invite_routes_1.default);
app.post("/test", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});
app.get("/", (req, res) => {
    res.send("Hello");
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, db_1.connectDB)();
});
