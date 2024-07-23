import { PrismaClient } from "@prisma/client";

export const deleteEvent = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.deleteMany({
    where: { id },
  });

  return event.count > 0 ? id : null;
};
