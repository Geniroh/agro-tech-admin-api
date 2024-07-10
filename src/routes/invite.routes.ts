import express from "express";
import {
  checkInviteToken,
  inviteAdmin,
} from "../controllers/invite.controller";
const router = express.Router();

router.post("/", inviteAdmin);
router.get("/check/:id", checkInviteToken);

export default router;
