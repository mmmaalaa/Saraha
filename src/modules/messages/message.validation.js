import joi from "joi";

const checkObjectId = joi
  .string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();
  
export const createMessageValidation = joi.object({
  receiver: checkObjectId,
  content: joi.string().min(5).max(500).required(),
});

export const getMessagesValidation = joi.object({
  userStatus: joi.string().valid("sender", "receiver").required(),
});

export const getSingleMessagevalidation = joi.object({
  id: checkObjectId,
});
