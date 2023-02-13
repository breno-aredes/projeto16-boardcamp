import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().required().positive(),
  pricePerDay: joi.number().required().positive(),
});
