import express from "express";
import rateLimit from "express-rate-limit";
import { uploadCandidateResume } from "../middleware/contactUpload.middleware.js";
import { createContact } from "../controllers/contact.controller.js";

const router = express.Router();

const contactSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact submissions. Please try again later.",
  },
});

const setContactType = (type) => (req, res, next) => {
  req.params.type = type;
  next();
};

// Public submit
router.post(
  "/company",
  contactSubmitLimiter,
  setContactType("company"),
  uploadCandidateResume,
  createContact
);
router.post(
  "/candidate",
  contactSubmitLimiter,
  setContactType("candidate"),
  uploadCandidateResume,
  createContact
);

export default router;
