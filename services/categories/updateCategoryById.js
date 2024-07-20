import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const updateCategoryById = (id, name) => {
  const category = categoryData.categories.find(
    (category) => category.id === id
  );

  if (!category) {
    throw new NotFoundError("Category", id);
  }

  category.name = name ?? category.name;

  return { message: "Category updated successfully", category };
};
