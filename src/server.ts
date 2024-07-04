import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import { handleErrorsMiddleware } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(handleErrorsMiddleware);

app.use("/auth", authRoutes);

app.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  res.json(req.body);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
