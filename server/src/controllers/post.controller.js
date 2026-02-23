//F:\horizon-group-web\server\src\controllers\post.controller.js

import { success } from "zod";
import prisma from "../config/prisma.js";
import { createPostSchema, updatePostSchema } from "../validators/post.validator.js";

// CREATE POST
export const createPost = async (req, res) =>{
    try {
        const validatedData = createPostSchema.parse(req.body);

        const existingSlug = await prisma.post.findUnique({
            where: {slug: validatedData.slug}
        });

        if(existingSlug){
            return res.status(400).json({
                success: false,
                message: "Slug already exists"
            });
        }
        const post = await prisma.post.create({
            data: validatedData
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
// GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10 
        const categoryId = req.query.categoryId;

        const skip = (page - 1) * limit;

        const whereCondition = {}

        if(categoryId){
            whereCondition.categoryId = Number(categoryId);
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where: whereCondition,
                include: {
                    category: true,
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.post.count({
                where: whereCondition,
            }),
        ]);

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
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET single post by id (admin edit/detail)
export const getPostById = async (req, res) =>{
    try {
        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                success: false,
                message: "Invalid post id",
            });
        };
        const post = await prisma.post.findUnique({
            where: {id},
            include: {category: true},
        });
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        };
        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// GET single post by slug (human-friendly URL)
export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: { category: true },
        });

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// UPDATE POST
export const updatePost = async (req, res) =>{
    try {
        const { id } = req.params;

        const validatedData = updatePostSchema.parse(req.body);

        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: validatedData
        });
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// DELETE POST
export const deletePost = async (req, res) =>{
    try{
        const { id } = req.params;

        await prisma.post.delete({
            where: {id: Number(id)}
        });

        res.status(200).json({
            success: true,
            message :"Post deleted successfully"
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}