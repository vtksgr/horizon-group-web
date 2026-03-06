// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import { attachRequestId } from "./middleware/requestId.middleware.js";

// pages
import adminRoutes from "./routes/admin.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import jobRoutes from "./routes/job.routes.js";
import postRoutes from "./routes/post.route.js";

const app = express();

const allowedOrigins = String(process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools / same-origin requests without Origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(attachRequestId);

// Morgan custom tokens
morgan.token("requestId", (req) => req.id || "-");
morgan.token("adminId", (req) => (req.admin?.id ? String(req.admin.id) : "-"));

// Request logs
app.use(
  morgan((tokens, req, res) =>
    JSON.stringify({
      requestId: tokens.requestId(req, res),
      method: tokens.method(req, res),
      path: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      responseTimeMs: Number(tokens["response-time"](req, res)),
      contentLength: tokens.res(req, res, "content-length") || "0",
      ip: req.ip,
      userAgent: req.get("user-agent") || "-",
      adminId: tokens.adminId(req, res),
    })
  )
);

app.use(express.json());

// home page
app.get("/", (req, res) => {
  res.send("Hello, Horizon Group!");
});

// API
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/posts", postRoutes);

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    requestId: req.id,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error("request_error", {
    requestId: req.id,
    method: req.method,
    path: req.originalUrl,
    adminId: req.admin?.id || null,
    status: err.status || null,
    errorName: err.name || "Error",
    errorCode: err.code || null,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors,
      requestId: req.id,
    });
  }

  // Prisma errors
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      success: false,
      message: "Database error",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
      requestId: req.id,
    });
  }

  // Type errors
  if (err instanceof TypeError) {
    return res.status(400).json({
      success: false,
      message: "Invalid request format",
      error: err.message,
      requestId: req.id,
    });
  }

  // Default
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    requestId: req.id,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
