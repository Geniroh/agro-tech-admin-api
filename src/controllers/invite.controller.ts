import { Request, Response } from "express";
import { sendMail } from "../utils/mail";
import { emailInvitationSchemaDto } from "../dto/invitation.dto";
import { v4 as uuidv4 } from "uuid";
import Invitation from "../models/inviteToken.model";

export const inviteAdmin = async (req: Request, res: Response) => {
  try {
    const { error, value } = await emailInvitationSchemaDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    const { email } = value;

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

    const existingToken = await Invitation.find({ email });

    if (existingToken) {
      await Invitation.deleteOne({ email });
    }

    const newToken = await Invitation.create({
      email,
      token,
      expires,
    });

    const response = await sendMail("Stavmia", email, token);

    res.status(200).json({ token: newToken, message: response });
  } catch (error) {
    res.status(500).json({ error: "Could not send invite" });
  }
};
