import Joi from "joi";

export const userRegistationValidationSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Full name must be a text value.",
    "string.empty": "Full name is required.",
    "string.min": "Full name must be at least 3 characters long.",
    "string.max": "Full name cannot exceed 50 characters.",
    "any.required": "Full name is required.",
  }),

  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username must be a text value.",
    "string.empty": "Username is required.",
    "string.alphanum": "Username must contain only letters and numbers.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a text value.",
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(8).max(128).required().messages({
    "string.base": "Password must be a text value.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 128 characters.",
    "any.required": "Password is required.",
  }),
  confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Password and confirm password do not match",
    "string.empty": "Confirm password is required",
  }),
});

export const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a text value.",
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(8).max(128).required().messages({
    "string.base": "Password must be a text value.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 128 characters.",
    "any.required": "Password is required.",
  }),
});
