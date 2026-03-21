import express from "express";
import {
  getAllPosts,
  getPostById,
} from "../controllers/post.controller.js";

const router = express.Router();

// Public flow
router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;
