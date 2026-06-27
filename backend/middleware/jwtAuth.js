import jwt from "jsonwebtoken";

import prisma from "../prisma/db.js";

const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const blacklistedToken = await prisma.tokenBlacklist.findUnique({
      where: {
        token,
      },
    });

    if (blacklistedToken) {
      return res.status(401).json({
        message: "Token has been invalidated",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorised to access this route",
    });
  }
};

export default jwtAuth;