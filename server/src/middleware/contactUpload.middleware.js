import multer from "multer";

// Use memory storage (file stored in buffer)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

export const uploadCandidateResume = (req, res, next) => {
    const handler = upload.single("resume");

    handler(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || "File upload error",
            });
        }

        const typeParam = String(req.params.type || "").toUpperCase();

        // If NOT candidate but file exists -> reject
        if (typeParam !== "CANDIDATE" && req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume upload allowed only for candidate contact",
            });
        }

        // If file exists -> validate PDF
        if (req.file) {
            const isPdfMime = req.file.mimetype === "application/pdf";
            const isPdfExtension = req.file.originalname
                .toLowerCase()
                .endsWith(".pdf");

            if (!isPdfMime || !isPdfExtension) {
                return res.status(400).json({
                    success: false,
                    message: "Only PDF files are allowed",
                });
            }
        }

        next();
    });
};
