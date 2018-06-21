import express = require('express');
import { getOne, getAll, createOne, updateOne, deleteOne } from './user.controller';

export const userRouter = express.Router();

// userRouter.param('id', findByParam);

userRouter.route('/')
  .get(getAll)
  .post(createOne);

userRouter.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);
