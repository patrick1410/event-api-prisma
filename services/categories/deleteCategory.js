import categoryData from "../../data/categories.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const deleteCategory = (id) => {
  const index = categoryData.categories.findIndex(
    (category) => category.id === id
  );

  if (index === -1) {
    throw new NotFoundError("Category", id);
  }

  categoryData.categories.splice(index, 1);
  return id;
};
