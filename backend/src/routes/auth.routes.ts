import { Router } from "express";
import {
  adminLogin,
  forgotPassword,
  getMe,
  google,
  login,
  refresh,
  register,
  resetPasswordHandler,
  verifyOtpHandler,
} from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth";
import { requireRole } from "../middleware/roleGuard";
import { validateRequest } from "../middleware/validateRequest";
import {
  adminLoginSchema,
  forgotPasswordSchema,
  googleSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../validators/auth.validators";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/google", validateRequest(googleSchema), google);
router.post("/login", validateRequest(loginSchema), login);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), forgotPassword);
router.post("/verify-otp", validateRequest(verifyOtpSchema), verifyOtpHandler);
router.post("/reset-password", validateRequest(resetPasswordSchema), resetPasswordHandler);
router.post("/refresh", validateRequest(refreshSchema), refresh);
router.post("/admin/login", validateRequest(adminLoginSchema), adminLogin);

router.get("/me", authenticateJWT, requireRole(["user", "admin"]), getMe);

export default router;
