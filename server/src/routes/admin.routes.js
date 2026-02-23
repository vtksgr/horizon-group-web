import express from "express";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";


const router = express.Router();

//Dashboard
router.get("/dashboard", protectAdmin, getDashboardStats);

export default router;
