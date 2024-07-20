import { PrismaClient } from "@prisma/client";

export const createUser = async (username, password, name, image) => {
  const prisma = new PrismaClient();

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      name,
      image,
    },
  });

  return newUser;
};
