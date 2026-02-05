import Joi from 'joi';

export const testSchema = {
  payload: Joi.object({
    testInput: Joi.string().min(3).required(),
  }),
};
