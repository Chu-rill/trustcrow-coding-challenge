import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the Bearer token in the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id, // Ensure this matches the token payload
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = { id: decoded.id };

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { authenticate };
