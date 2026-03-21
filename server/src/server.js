import "dotenv/config";
import prisma from "./config/prisma.js";
import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    logger.info("database_connected");

    app.listen(PORT, () => {
      logger.info("server_started", { port: Number(PORT) });
    });
  } catch (error) {
    logger.error("server_start_failed", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    process.exit(1);
  }
}

startServer();
