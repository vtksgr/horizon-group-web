import "dotenv/config";
import prisma from "./config/prisma.js";
import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
const DB_CONNECT_RETRY_DELAY_MS = 5000;

async function connectDatabaseWithRetry() {
  try {
    await prisma.$connect();
    logger.info("database_connected");
  } catch (error) {
    logger.error("database_connect_failed", {
      message: error.message,
      retryInMs: DB_CONNECT_RETRY_DELAY_MS,
    });

    setTimeout(() => {
      void connectDatabaseWithRetry();
    }, DB_CONNECT_RETRY_DELAY_MS);
  }
}

async function startServer() {
  try {
    const server = app.listen(PORT, HOST, () => {
      logger.info("server_started", {
        port: Number(PORT),
        host: HOST,
      });
    });

    server.on("error", (error) => {
      logger.error("server_runtime_error", {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
      process.exit(1);
    });

    void connectDatabaseWithRetry();
  } catch (error) {
    logger.error("server_start_failed", {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    process.exit(1);
  }
}

startServer();
