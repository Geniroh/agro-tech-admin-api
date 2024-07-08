import Joi from "joi";

export const featuredPostsDto = Joi.object({
  mediaUrl: Joi.string().required(),
  title: Joi.string().required(),
  tag: Joi.array().items(Joi.string()).required(),
});

export const updateFeaturedPostsDto = Joi.object({
  imgUrl: Joi.string().optional(),
  title: Joi.string().optional(),
  tag: Joi.array().items(Joi.string()).optional(),
});
