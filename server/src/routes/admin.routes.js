import express from "express";
import { protectAdmin, requireTrustedAdminOrigin } from "../middleware/adminAuth.middleware.js";
import { uploadPostImages } from "../middleware/postUpload.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";
import {
  getAdminContacts,
  getAdminContactById,
  downloadAdminContactResume,
  deleteAdminContactById,
  updateAdminContactStatus,
} from "../controllers/contact.controller.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getAdminPostById,
  getPostCategories,
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
router.get("/contacts/:id/resume", protectAdmin, downloadAdminContactResume);
router.delete("/contacts/:id", requireTrustedAdminOrigin, protectAdmin, deleteAdminContactById);
router.patch("/contacts/:id/status", requireTrustedAdminOrigin, protectAdmin, updateAdminContactStatus);

// Admin posts
router.post("/posts", requireTrustedAdminOrigin, protectAdmin, uploadPostImages, createPost);
router.get("/posts", protectAdmin, getAllPosts);
router.get("/posts/categories", protectAdmin, getPostCategories);
router.get("/posts/:id", protectAdmin, getAdminPostById);
router.put("/posts/:id", requireTrustedAdminOrigin, protectAdmin, uploadPostImages, updatePost);
router.delete("/posts/:id", requireTrustedAdminOrigin, protectAdmin, deletePost);



// Admin jobs
router.post("/jobs", requireTrustedAdminOrigin, protectAdmin, createJob);
router.get("/jobs", protectAdmin, getAdminJobs);
router.put("/jobs/:id", requireTrustedAdminOrigin, protectAdmin, updateJob);
router.delete("/jobs/:id", requireTrustedAdminOrigin, protectAdmin, deleteJob);
router.patch("/jobs/:id/status", requireTrustedAdminOrigin, protectAdmin, updateJobStatus);

export default router;
