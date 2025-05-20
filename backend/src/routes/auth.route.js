import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  renewRefreshToken,
  resetPassword,
  updateProfile,
  verifyUser,
  resendVerificationEmail,
} from "../controllers/auth.controller.js";
import { registerSchema } from "../validators/registerSchema.js";
import { loginSchema } from "../validators/loginSchema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const router = Router();

router.route("/login").post(validateMiddleware(loginSchema), loginUser);
router
  .route("/register")
  .post(validateMiddleware(registerSchema), registerUser);
router.route("/verify").get(verifyUser);
router.route("/resend-verification").post(resendVerificationEmail);
router.route("/refresh-token").get(renewRefreshToken);
router
  .route("/profile")
  .get(authMiddleware, getProfile)
  .patch(authMiddleware, updateProfile);
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;
