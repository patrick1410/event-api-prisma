import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const getCategoryById = (id) => {
  if (!id) {
    throw new NotFoundError("Category", id);
  }
  return categoryData.categories.find((category) => category.id === id);
};
