import { PrismaClient } from "@prisma/client";

export const updateUserById = async (id, updatedUserObj) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({
    where: { id },
    data: updatedUserObj,
  });

  return user.count > 0 ? id : null;
};
