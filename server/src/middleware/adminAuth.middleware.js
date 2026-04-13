//F:\horizon-group-web\server\src\middleware\adminAuth.middleware.js
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

const ADMIN_AUTH_COOKIE = "admin_auth";

function normalizeOrigin(value) {
    return String(value || "")
        .trim()
        .replace(/\/+$/, "")
        .toLowerCase();
}

function readCookie(req, cookieName) {
    const cookieHeader = String(req.headers.cookie || "");

    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(";");

    for (const rawCookie of cookies) {
        const [name, ...valueParts] = rawCookie.trim().split("=");

        if (name === cookieName) {
            return decodeURIComponent(valueParts.join("="));
        }
    }

    return null;
}

function getAdminTokenFromRequest(req) {
    const authHeaderToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

    return readCookie(req, ADMIN_AUTH_COOKIE) || authHeaderToken || null;
}


export const protectAdmin = async (req, res, next) =>{
    try {
        const token = getAdminTokenFromRequest(req);

        if(!token){
            return res.status(401).json({message: "Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await prisma.admin.findUnique({
            where: {id: decoded.id},
        });

        if(!admin || !admin.isActive){
            return res.status(403).json({message: "Access denied"});
        }
        req.admin = admin
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const requireTrustedAdminOrigin = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }

    const allowedOrigins = String(process.env.FRONTEND_ORIGINS || "")
        .split(",")
        .map((origin) => normalizeOrigin(origin))
        .filter(Boolean);

    const origin = normalizeOrigin(req.get("origin"));
    const referer = normalizeOrigin(req.get("referer"));

    const hasTrustedOrigin = origin && allowedOrigins.includes(origin);
    const hasTrustedReferer = referer && allowedOrigins.some((allowedOrigin) => referer.startsWith(allowedOrigin));

    if (!hasTrustedOrigin && !hasTrustedReferer) {
        return res.status(403).json({ message: "Untrusted origin" });
    }

    return next();
};
