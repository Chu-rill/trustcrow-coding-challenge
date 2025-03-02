import Joi from "joi";

export const create_task_query_validator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "any.required": "Title is a required field",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is a required field",
  }),
});

export const update_task_query_validator = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is optional",
    "any.required": "Title is an optional field",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is optional",
    "any.required": "Description is an optional field",
  }),
});
