// server/src/services/postMedia.service.js
import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const ensureCloudinaryConfigured = () => {
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        throw new Error(
            "Missing Cloudinary env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
        );
    }

    if (!isConfigured) {
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        isConfigured = true;
    }
};

const uploadImage = (file, folder) =>
    new Promise((resolve, reject) => {
        try {
            ensureCloudinaryConfigured();
        } catch (error) {
            return reject(error);
        }

        if (!file) return reject(new Error("No file provided"));
        if (!file.buffer || !Buffer.isBuffer(file.buffer)) {
            return reject(new Error("Invalid file buffer"));
        }

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result?.secure_url) {
                    return reject(new Error("Cloudinary image upload failed"));
                }
                resolve(result.secure_url);
            }
        );

        stream.end(file.buffer);
    });

export const uploadPostBanner = (file) =>
    uploadImage(file, "horizon-group/posts/banner");
