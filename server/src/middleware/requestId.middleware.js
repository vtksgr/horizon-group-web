// server/src/middleware/requestId.middleware.js

import crypto from "crypto";

export const attachRequestId = (req, res, next) => {
  const incomingRequestId = req.headers["x-request-id"];
  req.id = incomingRequestId ? String(incomingRequestId) : crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
};

