// src/controllers/job.controller.js
import prisma from "../config/prisma.js";
import validateJob from "../validators/job.validator.js";
import logger from "../utils/logger.js";

// Create job
export const createJob = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is required",
            });
        }

        const validatedData = validateJob(req.body);

        const job = await prisma.job.create({
            data: validatedData,
        });

        logger.info("admin_job_created", {
            adminId: req.admin?.id || null,
            jobId: job.id,
            slug: job.slug,
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job,
        });
    } catch (error) {
        logger.error("admin_job_create_error", {
            adminId: req.admin?.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        next(error);
    }
};

// Public jobs list
// Public jobs list
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { isActive: true }, // public only active jobs
            orderBy: { createdAt: "desc" },
        });

        logger.info("jobs_list_viewed", {
            total: jobs.length,
        });

        res.status(200).json({
            success: true,
            data: jobs,
        });
    } catch (error) {
        logger.error("jobs_list_error", {
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// Admin list jobs with pagination
export const getAdminJobs = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 20);

        if (!Number.isInteger(page) || page <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid page. Use a positive integer",
            });
        }

        if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: "Invalid limit. Use a positive integer up to 100",
            });
        }

        const skip = (page - 1) * limit;

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.job.count(),
        ]);

        logger.info("admin_jobs_list_viewed", {
            adminId: req.admin?.id || null,
            page,
            limit,
            total,
        });

        res.status(200).json({
            success: true,
            data: jobs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        logger.error("admin_jobs_list_error", {
            adminId: req.admin?.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Public job detail
// Public job detail
export const getJobById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id",
            });
        }

        const job = await prisma.job.findFirst({
            where: {
                id,
                isActive: true, // public detail must be active
            },
        });

        if (!job) {
            logger.warn("job_detail_not_found", { jobId: id });

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        logger.info("job_detail_viewed", { jobId: id });

        res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        logger.error("job_detail_error", {
            jobId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Update job
export const updateJob = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ success: false, message: "Invalid Job ID" });
        }

        const validatedData = validateJob(req.body);

        const existingJob = await prisma.job.findUnique({
            where: { id },
        });

        if (!existingJob) {
            logger.warn("admin_job_update_not_found", {
                adminId: req.admin?.id || null,
                jobId: id,
            });

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        const updatedJob = await prisma.job.update({
            where: { id },
            data: validatedData,
        });

        logger.info("admin_job_updated", {
            adminId: req.admin?.id || null,
            jobId: id,
        });

        res.json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        logger.error("admin_job_update_error", {
            adminId: req.admin?.id || null,
            jobId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        next(error);
    }
};

// Delete job
export const deleteJob = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id",
            });
        }

        await prisma.job.delete({
            where: { id },
        });

        logger.info("admin_job_deleted", {
            adminId: req.admin?.id || null,
            jobId: id,
        });

        res.json({ message: "Job deleted" });
    } catch (error) {
        if (error.code === "P2025") {
            logger.warn("admin_job_delete_not_found", {
                adminId: req.admin?.id || null,
                jobId: Number(req.params.id),
            });

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        logger.error("admin_job_delete_error", {
            adminId: req.admin?.id || null,
            jobId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({ message: "Server error" });
    }
};

// Admin update job status: isActive
export const updateJobStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id",
            });
        }

        const { isActive } = req.body || {};
        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be a boolean",
            });
        }

        const updatedJob = await prisma.job.update({
            where: { id },
            data: { isActive },
        });

        logger.info("admin_job_status_updated", {
            adminId: req.admin?.id || null,
            jobId: id,
            isActive,
        });

        res.status(200).json({
            success: true,
            message: "Job status updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        if (error.code === "P2025") {
            logger.warn("admin_job_status_not_found", {
                adminId: req.admin?.id || null,
                jobId: Number(req.params.id),
            });

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        logger.error("admin_job_status_error", {
            adminId: req.admin?.id || null,
            jobId: req.params.id || null,
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
