import rateLimit from "express-rate-limit";

import jwt from "jsonwebtoken";

//get da role
function getRoleFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.role ?? null;
  } catch {

    return null;
  }
}

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window

  max: (req) => {
    const role = getRoleFromRequest(req);
    if (role === "ADMIN") return 10000;
    else if (role === "USER") return 1000;
    else return 100;

  },
  standardHeaders: true, // Add rate limit info to RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    message: "Too many requests, please try again later",
  },
});

export default rateLimiter;