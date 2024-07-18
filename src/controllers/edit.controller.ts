import { Request, Response } from "express";
import EditInnovation from "../models/edits.model";
import { sendRequestApproval } from "../utils/mail";

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

    const updatedEdit = await EditInnovation.findOneAndUpdate(
      { _id: id },
      { expires, status: "approved" },
      { new: true }
    );

    if (!updatedEdit) {
      return res.status(404).json({ error: "Not Found" });
    }

    await sendRequestApproval(updatedEdit.email, updatedEdit.token);

    res.status(200).json(updatedEdit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update request" });
  }
};

export const getAllRequest = async (req: Request, res: Response) => {
  try {
    const requests = await EditInnovation.find({ status: "unapprove" });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Could not get request" });
  }
};
