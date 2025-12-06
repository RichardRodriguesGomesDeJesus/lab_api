import { AppDataSource } from "../datasource.ts";
import User from "../models/user.model.ts";

const repository = AppDataSource.getRepository(User);

async function getUserById(id: string): Promise<User | null> {
  return await repository.findOneBy({ id });
}

async function getUserByUsername(username: string): Promise<User | null> {
  return await repository.findOneBy({ username });
}
async function getUsers() {
  return await repository.find();
}

async function createUser(
  username: string,
  password: string,
  userType: number,
  registerDate: string,
  active: number
): Promise<User> {
  const user = new User(username, password, userType, registerDate, active);

  return await repository.save(user);
}

async function updateUserById(
  username: string,
  password: string,
  userType: number,
  active: number,
  id: string
): Promise<User | null> {
  const user = await repository.findOneBy({ id });

  if (!user) return null;

  user.username = username;
  user.password = password;
  user.userType = userType;
  user.active = active;

  return await repository.save(user);
}

async function deleteUserById(id: string): Promise<boolean> {
  const user = await repository.findOneBy({ id });

  if (!user) return false;

  await repository.delete(id);

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
