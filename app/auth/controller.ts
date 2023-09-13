import { db } from "../../config/db";
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "./service";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function Register(req: Request, res: Response) {
  db.connect();

  const { full_name, email, password } = req.body;

  try {
    const isUserExist = await prisma.user?.findUnique({ where: { email } });

    if (!isUserExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma?.user?.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
        },
      });
      // Generate a JWT token for the user session
      const token = await jwt.sign(
        { userId: user?.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "730h",
        }
      );
      res.status(200).json({
        success: true,
        result: user,
        token,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "This user already exists!",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error,
    });
  }
}

async function Login(req: Request, res: Response) {
  let errors: string[] = [];

  const { email, password } = req.body;

  // Form validations
  if (!email || !password) {
    errors.push("Please enter all the fields");
    res.status(500).json({
      success: false,
      error: errors[0],
    });
  }

  if (errors.length > 0) {
    res.status(500).json({
      success: false,
      error: errors[0],
    });
  } else {
    // Check if the user email exists
    let user;
    if (prisma.user) {
      user = await prisma.user?.findUnique({
        where: { email: req.body.email },
      });
    }

    if (!user || !comparePassword(password, user.password)) {
      errors.push("Credentials incorrect");
      res.status(500).json({
        success: false,
        error: errors[0],
      });
    } else {
      const payload = {
        email: user.email,
        id: user.id,
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      // Return the current user & the token
      res.status(200).json({
        success: true,
        user,
        token,
      });
    }
  }
}

export const authController = {
  Register,
  Login,
};
