import express from "express";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";
import { uploadPostImages } from "../middleware/postUpload.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";
import {
  getAdminContacts,
  getAdminContactById,
  deleteAdminContactById,
  updateAdminContactStatus,
} from "../controllers/contact.controller.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controller.js";
import {
  createJob,
  updateJob,
  deleteJob,
  getAdminJobs,
  updateJobStatus,
} from "../controllers/job.controller.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", protectAdmin, getDashboardStats);

// Admin contacts
router.get("/contacts", protectAdmin, getAdminContacts);
router.get("/contacts/:id", protectAdmin, getAdminContactById);
router.delete("/contacts/:id", protectAdmin, deleteAdminContactById);
router.patch("/contacts/:id/status", protectAdmin, updateAdminContactStatus);

// Admin posts
router.post("/posts", protectAdmin, uploadPostImages, createPost);
router.get("/posts", protectAdmin, getAllPosts);
router.put("/posts/:id", protectAdmin, uploadPostImages, updatePost);
router.delete("/posts/:id", protectAdmin, deletePost);

// Admin jobs
router.post("/jobs", protectAdmin, createJob);
router.get("/jobs", protectAdmin, getAdminJobs);
router.put("/jobs/:id", protectAdmin, updateJob);
router.delete("/jobs/:id", protectAdmin, deleteJob);
router.patch("/jobs/:id/status", protectAdmin, updateJobStatus);

export default router;
