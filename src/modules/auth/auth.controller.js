import { Router } from "express";
import { register, login, activateAccount } from "./auth.services.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/activateAccount/:token", activateAccount);

export default router;
