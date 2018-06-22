import express = require('express');
import { userRouter } from './resources/user';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
// restRouter.use('/exercise', exerciseRouter);
// restRouter.use('/session', sessionRouter);
