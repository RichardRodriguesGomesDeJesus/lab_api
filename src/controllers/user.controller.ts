import { Request, Response } from "express";
import User from "../models/user.model.ts";
import userRepository from "../repositories/user.repository.js";

function getUserByUsername(req: Request, res: Response) {
  const username = String(req.params.username);

  const user = userRepository.getUserByUsername(username);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json(user);
}

function getUsers(req: Request, res: Response) {
  const users = userRepository.getUsers();

  res.status(200).json(users);
}

function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const user = userRepository.getUserById(id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json(user);
  }
}

function createUser(req: Request, res: Response) {
  const data = req.body as User;
  const user = userRepository.createUser(
    data.username,
    data.password,
    data.userType,
    new Date().toISOString().split("T")[0],
    data.active
  );

  res.status(200).json(user);
}

function updateUser(req: Request, res: Response) {
  const id = req.params.id;
  const updatedUser = req.body as User;
  const user = userRepository.updateUserById(
    updatedUser.username,
    updatedUser.password,
    updatedUser.userType,
    updatedUser.active,
    id
  );

  if (!user) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json(user);
  }
}

function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const deletedUser = userRepository.deleteUserById(id);

  if (!deletedUser) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json({ message: "User deleted" });
  }
}

export default {
  getUserByUsername,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
