import Joi from "joi";

export const emailInvitationSchemaDto = Joi.object({
  email: Joi.string().email(),
});
