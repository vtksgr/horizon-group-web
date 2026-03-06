// server/src/utils/logger.js

const LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const env = process.env.NODE_ENV || "development";
const configuredLevel = (
    process.env.LOG_LEVEL || (env === "production" ? "info" : "debug")
).toLowerCase();

const minLevel = LEVELS[configuredLevel] ?? LEVELS.info;

const shouldLog = (level) => {
    const currentLevel = LEVELS[level] ?? LEVELS.info;
    return currentLevel <= minLevel;
};

const timestamp = () => new Date().toISOString();

const write = (level, message, meta = {}) => {
    if (!shouldLog(level)) return;

    const payload = {
        timestamp: timestamp(),
        level,
        message,
        ...meta,
    };

    if (env === "production") {
        process.stdout.write(`${JSON.stringify(payload)}\n`);
        return;
    }

    const details = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    process.stdout.write(
        `${payload.timestamp} [${level.toUpperCase()}] ${message}${details}\n`
    );
};

const logger = {
    error: (message, meta) => write("error", message, meta),
    warn: (message, meta) => write("warn", message, meta),
    info: (message, meta) => write("info", message, meta),
    debug: (message, meta) => write("debug", message, meta),
};

export const maskEmail = (email) => {
    if (!email || typeof email !== "string" || !email.includes("@")) return null;

    const [localPart, domain] = email.split("@");
    if (!localPart || !domain) return null;

    const visible = localPart.slice(0, 2);
    return `${visible}***@${domain}`;
};

export const maskPhone = (phone) => {
    if (!phone || typeof phone !== "string") return null;

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 4) return "***";

    const last4 = digits.slice(-4);
    return `***-***-${last4}`;
};


export default logger;
