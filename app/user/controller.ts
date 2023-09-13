import { db } from "../../config/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers(req: any, res: any) {
  const users = await prisma.user.findMany();
  res.status(200).json({
    success: true,
    result: users,
  });
}
export const userController = {
  getUsers,
};
