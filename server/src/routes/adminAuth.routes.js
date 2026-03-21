import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminAuth.controller.js";
import { adminLoginLimiter } from "../middleware/authRateLimit.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", adminLoginLimiter, loginAdmin);

export default router;
