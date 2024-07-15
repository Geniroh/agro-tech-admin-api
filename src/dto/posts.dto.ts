import Joi from "joi";

export const featuredPostsDto = Joi.object({
  mediaUrl: Joi.string().required(),
  title: Joi.string().required(),
  tag: Joi.array().items(Joi.string()).required(),
  type: Joi.string().required(),
  thumbnailImage: Joi.string().optional(),
});

export const updateFeaturedPostsDto = Joi.object({
  mediaUrl: Joi.string().optional(),
  title: Joi.string().optional(),
  tag: Joi.array().items(Joi.string()).optional(),
  type: Joi.string().optional(),
  thumbnailImage: Joi.string().optional(),
});
