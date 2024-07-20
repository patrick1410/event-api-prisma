import categoryData from "../../data/categories.json" assert { type: "json" };

export const getCategories = () => {
  const categories = categoryData.categories;

  return categories;
};
