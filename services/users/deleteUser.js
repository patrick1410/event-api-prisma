import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

export const deleteUser = (id) => {
  const index = userData.users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new NotFoundError("User", id);
  }

  userData.users.splice(index, 1);
  return id;
};
