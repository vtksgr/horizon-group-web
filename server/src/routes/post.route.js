import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostById 
} from "../controllers/post.controller.js";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// User flow
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);

// Admin flow
router.post("/", protectAdmin, createPost);
router.get("/admin", protectAdmin, getAllPosts);
router.get("/id/:id", protectAdmin, getPostById);
router.put("/id/:id", protectAdmin, updatePost);
router.delete("/id/:id", protectAdmin, deletePost);

export default router;
