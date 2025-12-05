import User from "../models/user.model";

const users: User[] = [];

function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

function getUserByUsername(username: string): User | undefined {
  return users.find((usr) => usr.username === username);
}

function getUsers() {
  return users;
}

function createUser(
  username: string,
  password: string,
  userType: number,
  registerDate: string,
  active: number
): User {
  const user = new User(username, password, userType, registerDate, active);

  users.push(user);

  return user;
}

function updateUserById(
  username: string,
  password: string,
  userType: number,
  active: number,
  id: string
): User | undefined {
  const index = users.findIndex((usr) => usr.id === id);

  if (!index) return;

  users[index].username = username;
  users[index].password = password;
  users[index].userType = userType;
  users[index].active = active;

  return users[index];
}

function deleteUserById(id: string): boolean {
  const index = users.findIndex((usr) => usr.id === id);

  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}

export default {
  getUserById,
  getUserByUsername,
  getUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
