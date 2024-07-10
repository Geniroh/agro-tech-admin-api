import express from "express";
import { inviteAdmin } from "../controllers/invite.controller";
const router = express.Router();

router.post("/", inviteAdmin);

export default router;
