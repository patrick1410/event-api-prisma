import { PrismaClient } from "@prisma/client";

export const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();

  // Create the event and include related categories
  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy: {
        connect: { id: createdBy },
      },
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
    include: {
      categories: true, // Fetch the related categories
      createdBy: true, // Fetch the related user
    },
  });

  // Destructure and return the response object
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
    userId: event.createdBy.id,
    categoryIds: event.categories.map((category) => category.id),
  };
};
