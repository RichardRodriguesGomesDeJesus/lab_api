import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { User } from "../../models/user.model";

const userRepository = AppDataSource.getRepository(User);

export async function getUsers(req: Request, res: Response) {
  const users = await userRepository.find();
  return res.status(200).json(users);
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
}

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = userRepository.create({ name, email, password });
  await userRepository.save(user);

  return res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  userRepository.merge(user, req.body);
  await userRepository.save(user);

  return res.status(200).json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await userRepository.delete(id);

  if (deleted.affected === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted" });
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};