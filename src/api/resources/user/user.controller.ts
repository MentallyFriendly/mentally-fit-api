import { User } from './user.model';
import { Request, Response } from 'express';

export const createOne = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};
