import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the token from the request headers, cookies, or wherever you store it
  const token = req.headers.authorization?.replace("Bearer ", ""); // Assuming you use the "Bearer" scheme

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // If the token is valid, you can attach the user information to the request object
    req.userId = decoded.userId; // Assuming you stored the user ID in the token payload

    next();
  });
}
