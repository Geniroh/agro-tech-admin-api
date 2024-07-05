import Joi from "joi";

export const statusSchemaDto = Joi.object({
  status: Joi.string().valid("approved", "rejected", "pending").required(),
});
