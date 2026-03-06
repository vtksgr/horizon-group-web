import prisma from "../config/prisma.js";
import validateByType from "../validators/contact.validator.js";
import { sendContactNotificationEmail } from "../services/contactEmail.service.js";
import { uploadResumePdf } from "../services/cloudinary.service.js";
import logger, { maskEmail } from "../utils/logger.js";


export const createContact = async (req, res, next) => {
  try {
    const { type } = req.params;
    const contactType = String(type || "").toUpperCase();

    // Validate incoming data
    const validatedData = validateByType(contactType, req.body);
    let uploadedUrl;

    // Candidate resume upload (optional)
    if (contactType === "CANDIDATE" && req.file) {
      try {
        uploadedUrl = await uploadResumePdf(req.file);
      } catch (uploadError) {
        logger.error("contact_resume_upload_failed", {
          type: contactType,
          message: uploadError.message,
        });

        return res.status(503).json({
          success: false,
          message: "Resume upload service unavailable. Please try again later.",
        });
      }
    }

    // Create contact with nested relations for COMPANY/CANDIDATE
    const contact = await prisma.contact.create({
      data: {
        type: contactType,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        postalCode: validatedData.postalCode,
        address: validatedData.address,
        message: validatedData.message,
        ...(contactType === "COMPANY" && {
          company: {
            create: {
              companyName: validatedData.companyName,
              position: validatedData.position,
              inquiryType: validatedData.inquiryType,
            },
          },
        }),
        ...(contactType === "CANDIDATE" && {
          candidate: {
            create: {
              inquiryType: validatedData.inquiryType,
              resumeUrl: uploadedUrl || validatedData.resumeUrl,
            },
          },
        }),
      },
      include: {
        company: true,
        candidate: true,
      },
    });

    logger.info("contact_created", {
  contactId: contact.id,
  type: contact.type,
  emailMasked: maskEmail(contact.email),
});

    // Non-blocking email notification
    try {
      await sendContactNotificationEmail(contact);
    } catch (emailError) {
      logger.warn("contact_notification_failed", {
        contactId: contact.id,
        message: emailError.message,
      });
    }

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    logger.error("contact_create_error", {
      type: req.params.type || null,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    next(error);
  }
};

// Admin list contacts with filters:
// type=company|candidate|all, sort=newest|oldest, page, limit, search, from, to
export const getAdminContacts = async (req, res) => {
  try {
    const typeParam = String(req.query.type || "all").toLowerCase();
    const sortParam = String(req.query.sort || "newest").toLowerCase();
    const pageParam = Number(req.query.page || 1);
    const limitParam = Number(req.query.limit || 20);
    const search = String(req.query.search || "").trim();
    const from = req.query.from;
    const to = req.query.to;

    const typeMap = {
      company: "COMPANY",
      candidate: "CANDIDATE",
      all: undefined,
    };

    if (!(typeParam in typeMap)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Use company, candidate, or all.",
      });
    }

    if (sortParam !== "newest" && sortParam !== "oldest") {
      return res.status(400).json({
        success: false,
        message: "Invalid sort. Use newest or oldest.",
      });
    }

    if (!Number.isInteger(pageParam) || pageParam <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid page. Use a positive integer.",
      });
    }

    if (!Number.isInteger(limitParam) || limitParam <= 0 || limitParam > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid limit. Use a positive integer up to 100.",
      });
    }

    const where = {};

    if (typeMap[typeParam]) {
      where.type = typeMap[typeParam];
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (from !== undefined || to !== undefined) {
      const createdAt = {};

      if (from !== undefined) {
        const fromDate = new Date(String(from));
        if (Number.isNaN(fromDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid from date",
          });
        }
        createdAt.gte = fromDate;
      }

      if (to !== undefined) {
        const toDate = new Date(String(to));
        if (Number.isNaN(toDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid to date",
          });
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(String(to))) {
          toDate.setHours(23, 59, 59, 999);
        }

        createdAt.lte = toDate;
      }

      where.createdAt = createdAt;
    }

    const skip = (pageParam - 1) * limitParam;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          company: true,
          candidate: true,
        },
        orderBy: {
          createdAt: sortParam === "oldest" ? "asc" : "desc",
        },
        skip,
        take: limitParam,
      }),
      prisma.contact.count({ where }),
    ]);

    logger.info("admin_contacts_list_viewed", {
      adminId: req.admin?.id || null,
      type: typeParam,
      page: pageParam,
      limit: limitParam,
      total,
    });

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: pageParam,
        limit: limitParam,
        totalPages: Math.ceil(total / limitParam),
      },
    });
  } catch (error) {
    logger.error("admin_contacts_list_error", {
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

// Admin view single contact
export const getAdminContactById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact id",
      });
    }

    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        company: true,
        candidate: true,
      },
    });

    if (!contact) {
      logger.warn("admin_contact_detail_not_found", {
        adminId: req.admin?.id || null,
        contactId: id,
      });

      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    logger.info("admin_contact_detail_viewed", {
      adminId: req.admin?.id || null,
      contactId: id,
    });

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    logger.error("admin_contact_detail_error", {
      adminId: req.admin?.id || null,
      contactId: req.params.id || null,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin delete contact
export const deleteAdminContactById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact id",
      });
    }

    await prisma.contact.delete({
      where: { id },
    });

    logger.info("admin_contact_deleted", {
      adminId: req.admin?.id || null,
      contactId: id,
    });

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      logger.warn("admin_contact_delete_not_found", {
        adminId: req.admin?.id || null,
        contactId: Number(req.params.id),
      });

      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    logger.error("admin_contact_delete_error", {
      adminId: req.admin?.id || null,
      contactId: req.params.id || null,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin update contact status fields: isRead, isArchived
export const updateAdminContactStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact id",
      });
    }

    const { isRead, isArchived } = req.body || {};
    const data = {};

    if (typeof isRead === "boolean") {
      data.isRead = isRead;
    }

    if (typeof isArchived === "boolean") {
      data.isArchived = isArchived;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one boolean field: isRead or isArchived",
      });
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data,
      include: {
        company: true,
        candidate: true,
      },
    });

    logger.info("admin_contact_status_updated", {
      adminId: req.admin?.id || null,
      contactId: id,
      changedFields: Object.keys(data),
    });

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    if (error.code === "P2025") {
      logger.warn("admin_contact_status_not_found", {
        adminId: req.admin?.id || null,
        contactId: Number(req.params.id),
      });

      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    logger.error("admin_contact_status_error", {
      adminId: req.admin?.id || null,
      contactId: req.params.id || null,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
