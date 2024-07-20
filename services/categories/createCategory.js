import { PrismaClient } from "@prisma/client";

export const createCategory = async (name) => {
  const prisma = new PrismaClient();

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });

  return newCategory;
};
