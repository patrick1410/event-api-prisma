import userData from "../../data/users.json" assert { type: "json" };

export const getUsers = () => {
  const users = userData.users;

  return users;
};
