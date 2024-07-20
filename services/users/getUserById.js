import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const getUserById = (id) => {
  if (!id) {
    throw new NotFoundError("User", id);
  }

  return userData.users.find((user) => user.id === id);
};
