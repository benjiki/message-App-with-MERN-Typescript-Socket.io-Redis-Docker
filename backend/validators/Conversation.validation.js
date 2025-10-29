import Joi from "joi";

export const checkConnectionCodeValidationSchema = Joi.object({
  connectCode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.base": "Connection code must be a text value.",
      "string.empty": "Connection code is required.",
      "string.pattern.base": "Connection code must be a 6-digit number.",
      "any.required": "Connection code is required.",
    }),
});
