// src/validators/post.validator.js
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  featuredImg: z.string().url().optional(),
  categoryId: z.number(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional()
});

export const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  featuredImg: z.string().url().optional(),
  categoryId: z.number().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional()
});