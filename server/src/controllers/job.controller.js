//src/controllers/job.controller.js
import prisma from "../config/prisma.js";
import validateJob from "../validators/job.validator.js";

//Create job
export const createJob = async (req, res, next) => {
    try {
        // Validate request body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is required"
            });
        }

        // Validate and parse incoming data
        const validatedData = validateJob(req.body);

        // Create job in database
        const job = await prisma.job.create({
            data: validatedData
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job
        });
    } catch (error) {
        next(error);
    }
};

//Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({
            success: true,
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

//Get job with id
export const getJobById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id"
            });
        }
        const job = await prisma.job.findUnique({
            where: { id },
        });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        res.status(200).json({
            success: true,
            data: job
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update job
export const updateJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Validate ID
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Job ID" });
        }

        //Validate request body
        const validatedData = validateJob(req.body)

        // Check if job exists
        const existingJob = await prisma.job.findUnique({
            where: { id: Number(id) },
        });

        if (!existingJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const updatedJob = await prisma.job.update({
            where: { id: Number(id) },
            data: validatedData,
        });

        res.json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        next(error);
    }
}

// Delete job 
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.job.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

