import { PrismaClient } from "@prisma/client";

export const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: { id },
  });

  return event;
};
