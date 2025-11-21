import { Router } from "express";
import { register, login, activateAccount, reSendEmail } from "./auth.services.js";
import { resendEmailLimiter } from "../../middleware/rateLimiter.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/activateAccount/:token", activateAccount);
router.post("/resendEmail", resendEmailLimiter,reSendEmail);

export default router;
