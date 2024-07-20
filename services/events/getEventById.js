import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const getEventById = (id) => {
  if (!id) {
    throw new NotFoundError("Event", id);
  }
  return eventData.events.find((event) => event.id === id);
};
