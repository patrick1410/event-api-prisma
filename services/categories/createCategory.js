import { PrismaClient } from "@prisma/client";

export const createCategory = async (name) => {
  const prisma = new PrismaClient();

  return prisma.category.create({
    data: {
      name,
    },
  });
};
