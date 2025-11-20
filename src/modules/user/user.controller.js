import { Router } from "express";
import { getUserProfile } from "./user.services.js";
import { authentication } from "../../middleware/auth.js";

const router = Router();
router.get("/profile", authentication, getUserProfile);

export default router;

