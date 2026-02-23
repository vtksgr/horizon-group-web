import prisma from "../config/prisma.js";
import validateByType from "../validators/contact.validator.js";
import { sendContactNotificationEmail } from "../services/contactEmail.service.js"

export const createContact = async (req, res, next) => {
  try {
    const { type } = req.params;
    const contactType = type.toUpperCase();

    // Validate incoming data
    const validatedData = validateByType(contactType, req.body);

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
              resumeUrl: validatedData.resumeUrl,
            },
          },
        }),
      },
      include: {
        company: true,
        candidate: true,
      },
    });
    try {
      await sendContactNotificationEmail(contact);
    } catch (emailError) {
      console.error("Failed to send contact email:", emailError.message);
    }
    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};




// Admin list contacts with filters: type=company|candidate|all, sort=newest|oldest
export const getAdminContacts = async (req, res) => {
  try {
    const typeParam = String(req.query.type || "all").toLowerCase();
    const sortParam = String(req.query.sort || "newest").toLowerCase();

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

    const contacts = await prisma.contact.findMany({
      where: typeMap[typeParam] ? { type: typeMap[typeParam] } : {},
      include: {
        company: true,
        candidate: true,
      },
      orderBy: {
        createdAt: sortParam === "oldest" ? "asc" : "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin view single contact for email detail page
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
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin delete contact by parent contact id (cascades child relation)
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

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
