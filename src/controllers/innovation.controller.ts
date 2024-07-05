import Innovation from "../models/innovation.model";
import { Request, Response } from "express";
import Joi from "joi";
import { statusSchemaDto } from "../dto/innovation.dto";
import { error } from "console";

export const getAllInnovation = async (req: Request, res: Response) => {
  try {
    const allInnovation = await Innovation.find();
    res.json(allInnovation).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getInnovationById = async (req: Request, res: Response) => {
  try {
    const innovationId = req.params.id;

    if (!innovationId) res.status(404).json({ error: "Innovation not found" });
    const innovation = await Innovation.findById(innovationId);

    res.status(200).json(innovation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInnovationStatus = async (req: Request, res: Response) => {
  try {
    const innovationId = req.params.id;
    const { error, value } = await statusSchemaDto.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    if (!innovationId)
      res.status(400).json({ error: "Innovation not found! " });

    const newInnovation = await Innovation.findByIdAndUpdate(
      innovationId,
      {
        status: value.status,
      },
      { new: true }
    );

    res.status(201).json(newInnovation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
