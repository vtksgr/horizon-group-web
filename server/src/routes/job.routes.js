import express from "express";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// User flow
router.get("/", getAllJobs);
router.get("/id/:id", getJobById);

// Admin flow
router.post("/", protectAdmin, createJob);
router.get("/admin", protectAdmin, getAllJobs);
router.put("/id/:id", protectAdmin, updateJob);
router.delete("/id/:id", protectAdmin, deleteJob);

export default router;
