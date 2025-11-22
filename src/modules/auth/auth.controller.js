import { Router } from "express";
import {
  register,
  login,
  activateAccount,
  reSendEmail,
} from "./auth.services.js";
import { resendEmailLimiter } from "../../middleware/rateLimiter.js";
import { validation } from "../../middleware/validation.js";
import {
  loginSchema,
  registerSchema,
  resendEmailSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validation(registerSchema), register);
router.post("/login", validation(loginSchema), login);
router.get("/activateAccount/:token", activateAccount);
router.post(
  "/resendEmail",
  resendEmailLimiter,
  validation(resendEmailSchema),
  reSendEmail
);

export default router;
