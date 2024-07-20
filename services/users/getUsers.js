import { PrismaClient } from "@prisma/client";

export const getUsers = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return users;
};
