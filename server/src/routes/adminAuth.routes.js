import express from "express";
import { registerAdmin, loginAdmin, logoutAdmin, getAdminSession } from "../controllers/adminAuth.controller.js";
import { adminLoginLimiter } from "../middleware/authRateLimit.middleware.js";
import { protectAdmin, requireTrustedAdminOrigin } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", requireTrustedAdminOrigin, adminLoginLimiter, loginAdmin);
router.post("/logout", requireTrustedAdminOrigin, logoutAdmin);
router.get("/session", protectAdmin, getAdminSession);

export default router;
