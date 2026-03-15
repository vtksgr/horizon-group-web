// server/src/controllers/post.controller.js
import prisma from "../config/prisma.js";
import { createPostSchema, updatePostSchema } from "../validators/post.validator.js";
import { uploadPostBanner } from "../services/postMedia.service.js";
import logger from "../utils/logger.js";

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const validatedData = createPostSchema.parse(req.body);

        const existingSlug = await prisma.post.findUnique({
            where: { slug: validatedData.slug },
        });

        if (existingSlug) {
            logger.warn("admin_post_create_slug_conflict", {
                adminId: req.admin?.id || null,
                slug: validatedData.slug,
            });

            return res.status(400).json({
                success: false,
                message: "Slug already exists",
            });
        }

        const data = { ...validatedData };

        if (req.file) {
            data.bannerImg = await uploadPostBanner(req.file);
        }

        const post = await prisma.post.create({ data });

        logger.info("admin_post_created", {
            adminId: req.admin?.id || null,
            postId: post.id,
            slug: post.slug,
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        logger.error("admin_post_create_error", {
            adminId: req.admin?.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// Get post for admin
export const getAdminPostById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id",
            });
        }

        const post = await prisma.post.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!post) {
            logger.warn("admin_post_detail_not_found", {
                adminId: req.admin?.id || null,
                postId: id,
            });

            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        logger.info("admin_post_detail_viewed", {
            adminId: req.admin?.id || null,
            postId: id,
        });

        return res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        logger.error("admin_post_detail_error", {
            adminId: req.admin?.id || null,
            postId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// GET ALL POSTS (public + admin list)
export const getAllPosts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const category = req.query.category;
        const from = req.query.from;
        const to = req.query.to;

        if (!Number.isInteger(page) || page <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid page. Use a positive integer.",
            });
        }

        if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: "Invalid limit. Use a positive integer up to 100.",
            });
        }

        const skip = (page - 1) * limit;
        const whereCondition = {};

        // Public route must only expose published posts
        const isAdminList = req.originalUrl.startsWith("/api/admin/posts");
        if (!isAdminList) {
            whereCondition.status = "PUBLISHED";
        }

        if (category !== undefined) {
            const normalizedCategory = String(category).trim().toLowerCase();
            const allowedCategories = ["news", "notice"];

            if (!allowedCategories.includes(normalizedCategory)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category. Use news or notice.",
                });
            }

            whereCondition.category = {
                name: {
                    equals: normalizedCategory,
                    mode: "insensitive",
                },
            };
        }

        if (from !== undefined || to !== undefined) {
            const createdAt = {};

            if (from !== undefined) {
                const fromDate = new Date(String(from));
                if (Number.isNaN(fromDate.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid from date",
                    });
                }
                createdAt.gte = fromDate;
            }

            if (to !== undefined) {
                const toDate = new Date(String(to));
                if (Number.isNaN(toDate.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid to date",
                    });
                }

                if (/^\d{4}-\d{2}-\d{2}$/.test(String(to))) {
                    toDate.setHours(23, 59, 59, 999);
                }

                createdAt.lte = toDate;
            }

            whereCondition.createdAt = createdAt;
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where: whereCondition,
                include: { category: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.post.count({ where: whereCondition }),
        ]);

        logger.info(isAdminList ? "admin_posts_list_viewed" : "posts_list_viewed", {
            adminId: req.admin?.id || null,
            page,
            limit,
            total,
            category: category || null,
            from: from || null,
            to: to || null,
        });

        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        logger.error("posts_list_error", {
            adminId: req.admin?.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET single post by id
export const getPostById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id",
            });
        }

        const isAdminRoute = req.originalUrl.startsWith("/api/admin/posts");

        const post = await prisma.post.findFirst({
            where: {
                id,
                ...(isAdminRoute ? {} : { status: "PUBLISHED" }),
            },
            include: { category: true },
        });

        if (!post) {
            logger.warn("post_detail_not_found", {
                postId: id,
                adminId: req.admin?.id || null,
            });

            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        logger.info("post_detail_viewed", {
            postId: id,
            adminId: req.admin?.id || null,
        });

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        logger.error("post_detail_error", {
            postId: req.params.id || null,
            adminId: req.admin?.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET single post by slug (optional legacy)
export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: { category: true },
        });

        if (!post) {
            logger.warn("post_slug_not_found", { slug });

            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        logger.info("post_slug_viewed", {
            slug,
            postId: post.id,
        });

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        logger.error("post_slug_error", {
            slug: req.params.slug || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE POST
export const updatePost = async (req, res) => {
    try {
        const parsedId = Number(req.params.id);

        if (!Number.isInteger(parsedId) || parsedId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id",
            });
        }

        const validatedData = updatePostSchema.parse(req.body);
        const data = { ...validatedData };

        const existingPost = await prisma.post.findUnique({
            where: { id: parsedId },
            select: { id: true, slug: true },
        });

        if (!existingPost) {
            logger.warn("admin_post_update_not_found", {
                adminId: req.admin?.id || null,
                postId: parsedId,
            });

            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (data.slug && data.slug !== existingPost.slug) {
            const slugTaken = await prisma.post.findUnique({
                where: { slug: data.slug },
                select: { id: true },
            });

            if (slugTaken) {
                logger.warn("admin_post_update_slug_conflict", {
                    adminId: req.admin?.id || null,
                    postId: parsedId,
                    slug: data.slug,
                });

                return res.status(400).json({
                    success: false,
                    message: "Slug already exists",
                });
            }
        }

        if (req.file) {
            data.bannerImg = await uploadPostBanner(req.file);
        }

        const post = await prisma.post.update({
            where: { id: parsedId },
            data,
        });

        logger.info("admin_post_updated", {
            adminId: req.admin?.id || null,
            postId: parsedId,
        });

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    } catch (error) {
        logger.error("admin_post_update_error", {
            adminId: req.admin?.id || null,
            postId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE POST
export const deletePost = async (req, res) => {
    try {
        const parsedId = Number(req.params.id);

        if (!Number.isInteger(parsedId) || parsedId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id",
            });
        }

        const existingPost = await prisma.post.findUnique({
            where: { id: parsedId },
            select: { id: true },
        });

        if (!existingPost) {
            logger.warn("admin_post_delete_not_found", {
                adminId: req.admin?.id || null,
                postId: parsedId,
            });

            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        await prisma.post.delete({
            where: { id: parsedId },
        });

        logger.info("admin_post_deleted", {
            adminId: req.admin?.id || null,
            postId: parsedId,
        });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        logger.error("admin_post_delete_error", {
            adminId: req.admin?.id || null,
            postId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
