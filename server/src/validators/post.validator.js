// server/src/validators/post.validator.js
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),

  // optional URL set by controller after upload
  bannerImg: z.string().url("Invalid banner image URL").optional(),

  // multipart form-data sends strings
  categoryId: z
    .coerce
    .number()
    .int()
    .positive("categoryId must be a positive integer"),

  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),

  bannerImg: z.string().url("Invalid banner image URL").optional(),

  categoryId: z
    .coerce
    .number()
    .int()
    .positive("categoryId must be a positive integer")
    .optional(),

  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});
