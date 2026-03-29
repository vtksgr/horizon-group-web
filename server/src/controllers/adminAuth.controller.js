import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginAdminSchema,
  registerAdminSchema,
} from "../validators/admin.validator.js";
import logger from "../utils/logger.js";

const ADMIN_AUTH_COOKIE = "admin_auth";

function getAdminCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  };
}

function clearAdminAuthCookie(res) {
  res.clearCookie(ADMIN_AUTH_COOKIE, {
    ...getAdminCookieOptions(),
    maxAge: undefined,
  });
}

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    // 1) Block public registration by default
    const allowAdminRegister = process.env.ALLOW_ADMIN_REGISTER === "true";
    const bootstrapToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
    const providedBootstrapToken = req.headers["x-admin-bootstrap-token"];

    const hasValidBootstrapToken =
      bootstrapToken &&
      providedBootstrapToken &&
      String(providedBootstrapToken) === String(bootstrapToken);

    // Allow if explicitly enabled OR valid bootstrap token provided
    if (!allowAdminRegister && !hasValidBootstrapToken) {
      logger.warn("admin_register_blocked", {
        reason: "registration_disabled",
      });

      return res.status(403).json({
        success: false,
        message: "Admin registration is disabled",
      });
    }

    const parsed = registerAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn("admin_register_validation_failed", {
        issues: parsed.error.issues,
      });

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: parsed.error.issues,
      });
    }

    const { username, email, password } = parsed.data;

    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingAdmin) {
      logger.warn("admin_register_conflict", {
        username,
        email,
      });

      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    logger.info("admin_register_success", {
      adminId: admin.id,
      username: admin.username,
      email: admin.email,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    logger.error("admin_register_error", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const parsed = loginAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn("admin_login_validation_failed", {
        issues: parsed.error.issues,
      });

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: parsed.error.issues,
      });
    }

    const { username, email, password } = parsed.data;

    // Build query: prefer username, fall back to email
    const whereClause = username ? { username } : { email };

    const admin = await prisma.admin.findUnique({
      where: whereClause,
    });

    if (!admin) {
      logger.warn("admin_login_failed_user_not_found", {
        username: username || null,
        email: email || null,
      });

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      logger.warn("admin_login_failed_invalid_password", {
        adminId: admin.id,
        username: admin.username,
      });

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    logger.info("admin_login_success", {
      adminId: admin.id,
      username: admin.username,
    });

    res.cookie(ADMIN_AUTH_COOKIE, token, getAdminCookieOptions());

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
      next: {
        dashboard: "/api/admin/dashboard",
      },
    });
  } catch (error) {
    logger.error("admin_login_error", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminSession = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: req.admin.id,
        username: req.admin.username,
        email: req.admin.email,
      },
    });
  } catch (error) {
    logger.error("admin_session_error", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    clearAdminAuthCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    logger.error("admin_logout_error", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    return res.status(500).json({ message: "Server error" });
  }
};
