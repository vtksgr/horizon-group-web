// server/src/middleware/postUpload.middleware.js
import multer from "multer";

const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
});

export const uploadPostImages = (req, res, next) => {
    const handler = upload.single("banner");

    handler(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "File upload error",
            });
        }

        if (req.file && !ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Only JPG, PNG, and WEBP images are allowed",
            });
        }

        next();
    });
};
