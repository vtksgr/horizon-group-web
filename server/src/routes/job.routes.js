import express from "express";
import {
  getAllJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

// Public flow
router.get("/", getAllJobs);

export default router;
