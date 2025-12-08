const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5).messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const salesSchema = Joi.array().items(
  Joi.object(
    { productId: Joi.number().required().positive()
      .messages({
        'any.required': '"productId" is required', 
      }),
    quantity: Joi.number().required().min(1)
      .messages({
        'any.required': '"quantity" is required',
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
    },
  ),
);

module.exports = { productSchema, salesSchema };