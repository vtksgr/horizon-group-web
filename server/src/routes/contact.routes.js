import express from "express";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";

import { 
  createContact,
  getAdminContacts,
  getAdminContactById,
  deleteAdminContactById,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public submit
router.post("/:type", createContact);

// Admin view and delete
router.get("/admin", protectAdmin, getAdminContacts);
router.get("/admin/:id", protectAdmin, getAdminContactById);
router.delete("/admin/:id", protectAdmin, deleteAdminContactById);

export default router;

