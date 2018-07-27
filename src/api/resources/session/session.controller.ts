import { Session } from './session.model';
import { Request, Response } from 'express';

export const createOne = async (req: Request, res: Response) => {
  try {
    req.body.creator = req.user.id;
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find({});
    res.status(201).json(sessions);
  } catch (error) {
    console.error(error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const session = await Session.findOne({ _id: req.params.id });
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const session = await Session.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
  }
};
