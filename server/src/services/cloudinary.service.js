import { v2 as cloudinary } from "cloudinary";

//load env variables
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

// Basic validation (fail fast in dev)
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.warn("Cloudinary environment variables are missing.")
}

// Configure cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

/**
 * Upload resume PDF to Cloudinary
 * @param {Object} file - multer file object (memoryStorage)
 * @returns {Promise<string>} secure_url
 */

export const uploadResumePdf = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No file Provided"));
        }
        if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
            throw new Error(
                "Missing Cloudinary env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
            );
        }

        const originalName = String(file.originalname || "resume.pdf");
        const baseName = originalName
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .slice(0, 80) || "resume";

        const uploadStream = cloudinary.uploader.upload_stream({
            folder: "horizon-group/resumes",
            resource_type: "raw",
            format: "pdf",
            public_id: `candidate_resume_${Date.now()}_${baseName}`,
            overwrite: false,
        },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (!result || !result.secure_url) {
                    return reject(new Error("Cloudinary upload failed"));
                }
                resolve(result.secure_url);
            }
        );
        // Send file buffer to cloudinary
        uploadStream.end(file.buffer);
    });
}