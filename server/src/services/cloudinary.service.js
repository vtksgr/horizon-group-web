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

function extractCloudinaryRawAsset(fileUrl) {
    const decodedPath = decodeURIComponent(new URL(fileUrl).pathname || "");
    const marker = "/raw/upload/";
    const markerIndex = decodedPath.indexOf(marker);

    if (markerIndex < 0) {
        return { publicId: null, format: null };
    }

    const afterUpload = decodedPath.slice(markerIndex + marker.length);
    const parts = afterUpload.split("/").filter(Boolean);
    if (parts.length === 0) {
        return { publicId: null, format: null };
    }

    const versionIndex = parts.findIndex((part) => /^v\d+$/.test(part));
    const assetParts = versionIndex >= 0 ? parts.slice(versionIndex + 1) : parts;
    const fileWithExt = assetParts.join("/");

    if (!fileWithExt) {
        return { publicId: null, format: null };
    }

    const dotIndex = fileWithExt.lastIndexOf(".");
    if (dotIndex <= 0) {
        return { publicId: fileWithExt, format: null };
    }

    // Cloudinary raw assets are typically stored with extension inside public_id.
    return {
        publicId: fileWithExt,
        format: fileWithExt.slice(dotIndex + 1),
    };
}

export const buildSignedResumeDownloadUrl = (fileUrl) => {
    if (!fileUrl || !CLOUD_NAME || !API_KEY || !API_SECRET) {
        return null;
    }

    try {
        const { publicId, format } = extractCloudinaryRawAsset(fileUrl);

        if (!publicId) {
            return null;
        }

        return cloudinary.utils.private_download_url(publicId, format || "pdf", {
            resource_type: "raw",
            type: "upload",
            attachment: true,
            expires_at: Math.floor(Date.now() / 1000) + 300,
        });
    } catch {
        return null;
    }
};

function buildRawAssetPublicIdCandidates(fileUrl) {
    const { publicId } = extractCloudinaryRawAsset(fileUrl);
    if (!publicId) return [];

    const candidates = [publicId];
    if (/\.pdf$/i.test(publicId)) {
        candidates.push(publicId.replace(/\.pdf$/i, ""));
    }

    return [...new Set(candidates)];
}

export const deleteResumePdfByUrl = async (fileUrl) => {
    if (!fileUrl) {
        return { deleted: false, reason: "missing-url", attemptedPublicIds: [] };
    }

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        throw new Error(
            "Missing Cloudinary env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
        );
    }

    const candidates = buildRawAssetPublicIdCandidates(fileUrl);
    if (candidates.length === 0) {
        return { deleted: false, reason: "invalid-url", attemptedPublicIds: [] };
    }

    let lastError = null;

    for (const publicId of candidates) {
        try {
            const result = await cloudinary.uploader.destroy(publicId, {
                resource_type: "raw",
                type: "upload",
                invalidate: true,
            });

            if (result?.result === "ok") {
                return { deleted: true, publicId, attemptedPublicIds: candidates };
            }
        } catch (error) {
            lastError = error;
        }
    }

    if (lastError) {
        throw lastError;
    }

    return { deleted: false, reason: "not-found", attemptedPublicIds: candidates };
};