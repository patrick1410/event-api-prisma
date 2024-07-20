import express from "express";

import { getUsers } from "../services/users/getUsers.js";
import { getUserById } from "../services/users/getUserById.js";
import { createUser } from "../services/users/createUser.js";
import { updateUserById } from "../services/users/updateUserById.js";
import { deleteUser } from "../services/users/deleteUser.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} was not found!` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, image } = req.body;
    const newUser = await createUser(username, password, name, image);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, username, image } = req.body;
    const user = await updateUserById(id, { username, password, name, image });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} was updated!`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);

    if (deletedUser) {
      res.status(200).send({
        message: `User with id ${id} was deleted!`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
