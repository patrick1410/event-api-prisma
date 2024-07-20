import { PrismaClient } from "@prisma/client";

export const updateCategoryById = async (id, name) => {
  const prisma = new PrismaClient();

  const category = await prisma.category.updateMany({
    where: { id },
    data: name,
  });

  return category.count > 0 ? id : null;
};
