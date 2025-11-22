import { Router } from "express";
import { authentication } from "../../middleware/auth.js";
import {
  createMessage,
  getMessages,
  getSingleMessage,
} from "./message.services.js";
import { validation } from "../../middleware/validation.js";
import {
  createMessageValidation,
  getMessagesValidation,
  getSingleMessagevalidation,
} from "./message.validation.js";
const router = Router();

router.post(
  "/",
  validation(createMessageValidation),
  authentication,
  createMessage
);
router.get("/", validation(getMessagesValidation), authentication, getMessages);
router.get(
  "/:id",
  validation(getSingleMessagevalidation),
  authentication,
  getSingleMessage
);
export default router;
