import { Router } from "express";
import {
  getUserProfile,
  updateProfile,
  updateEmail,
  activateEmail,
  updatePassword,
  
} from "./user.services.js";
import { authentication } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import {
  updateProfileValidation,
  updateEmailValidation,
  updatePasswordValidation,
} from "./user.validation.js";

const router = Router();
router.get("/profile", authentication, getUserProfile);
router.patch(
  "/profile",
  validation(updateProfileValidation),
  authentication,
  updateProfile
);
router.patch(
  "/updateEmail",
  validation(updateEmailValidation),
  authentication,
  updateEmail
);
router.get('/activateEmail/:token',activateEmail)
router.patch('/updatePassword',validation(updatePasswordValidation),authentication,updatePassword)
export default router;
