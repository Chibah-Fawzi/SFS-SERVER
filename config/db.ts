import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = {
  prisma,
  connect: async () => {
    await prisma.$connect();
    console.log("Database connected");
  },
  disconnect: async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
  },
};
