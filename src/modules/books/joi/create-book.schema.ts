import * as Joi from 'joi';

export const CreateBookSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().empty(''),
  authors: Joi.array().items(Joi.string()),
  favorite: Joi.string().empty(''),
  fileCover: Joi.string().empty(''),
  fileName: Joi.string().empty(''),
});
