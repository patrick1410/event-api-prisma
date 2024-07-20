import express from "express";

import { getCategories } from "../services/categories/getCategories.js";
import { getCategoryById } from "../services/categories/getCategoryById.js";
import { createCategory } from "../services/categories/createCategory.js";
import { updateCategoryById } from "../services/categories/updateCategoryById.js";
import { deleteCategory } from "../services/categories/deleteCategory.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      res
        .status(404)
        .json({ message: `Category with id ${id} was not found!` });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await updateCategoryById(id, { name });

    if (category) {
      res.status(200).send({
        message: `Category with id ${id} was updated!`,
      });
    } else {
      res.status(404).json({
        message: `Category with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await deleteCategory(id);

    if (category) {
      res.status(200).send({
        message: `Category with id ${id} was deleted!`,
      });
    } else {
      res.status(404).json({
        message: `Category with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
