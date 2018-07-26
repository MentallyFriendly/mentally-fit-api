import * as express from 'express';
import { getOne, getAll, createOne, updateOne, deleteOne, deleteAll } from './user.controller';

export const userRouter = express.Router();

// userRouter.param('id', findByParam);

userRouter
  .route('/')
  .get(getAll)
  .post(createOne)
  .delete(deleteAll);

userRouter
  .route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);
