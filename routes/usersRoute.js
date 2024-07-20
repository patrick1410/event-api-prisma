import express from "express";

import { getUsers } from "../services/users/getUsers.js";
import { getUserById } from "../services/users/getUserById.js";
import { createUser } from "../services/users/createUser.js";
import { updateUserById } from "../services/users/updateUserById.js";
import { deleteUser } from "../services/users/deleteUser.js";

import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of users!");
  }
});

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} was not found!` });
    } else {
      res.status(200).json(user);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, (req, res) => {
  try {
    const { username, password, name, image } = req.body;
    const newUser = createUser(username, password, name, image);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating new user!");
  }
});

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { username, password, name, image } = req.body;
    const updatedUser = updateUserById(id, username, password, name, image);
    res.status(200).json(updatedUser);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedUserId = deleteUser(id);

    if (!deletedUserId) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    }
  },
  notFoundErrorHandler
);

export default router;
