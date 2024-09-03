import express from "express";

import { getEvents } from "../services/events/getEvents.js";
import { getEventById } from "../services/events/getEventById.js";
import { createEvent } from "../services/events/createEvent.js";
import { updateEventById } from "../services/events/updateEventById.js";
import { deleteEvent } from "../services/events/deleteEvent.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;
    const events = await getEvents(title);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

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

router.post("/", async (req, res, next) => {
  //authMiddleware,
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

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
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
    const event = await updateEventById(id, {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    });

    if (event) {
      res.status(200).send({
        message: `Event with id ${id} was updated!`,
      });
    } else {
      res.status(404).json({
        message: `Event with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEventId = await deleteEvent(id);

    if (!deletedEventId) {
      res.status(404).send({ message: `Event with id ${id} was not found!` });
    } else {
      res.status(200).json({
        message: `Event with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
