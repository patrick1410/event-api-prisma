import { PrismaClient } from "@prisma/client";

export const getCategories = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  return categories;
};
