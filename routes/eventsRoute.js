import express from "express";

import { getEvents } from "../services/events/getEvents.js";
import { getEventById } from "../services/events/getEventById.js";
import { createEvent } from "../services/events/createEvent.js";
import { updateEventById } from "../services/events/updateEventById.js";
import { deleteEvent } from "../services/events/deleteEvent.js";

import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

//NEW
router.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;
    const events = await getEvents(title);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

//NEW
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);

    if (!event) {
      res.status(404).json({ message: `Event with id ${id} was not found!` });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
});

//NEW
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const newEvent = await createEvent(
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;
    const updatedEvent = updateEventById(
      id,
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime
    );
    res.status(200).json(updatedEvent);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedEventId = deleteEvent(id);

    if (!deletedEventId) {
      res.status(404).send(`Event with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Event with id ${deletedEventId} was deleted!`,
      });
    }
  },
  notFoundErrorHandler
);

export default router;
