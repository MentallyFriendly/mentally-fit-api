import express = require('express');
import { getOne, getAll, createOne, updateOne, deleteOne } from './session.controller';

export const sessionRouter = express.Router();

sessionRouter.route('/')
  .get(getAll)
  .post(createOne);

sessionRouter.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);