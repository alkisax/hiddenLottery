import type { Request, Response } from 'express';
import * as userService from './user.service';

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const user = await userService.createUser(email, name);
  res.status(201).json(user);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};
