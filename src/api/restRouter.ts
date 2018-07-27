import * as express from 'express';
import { userRouter } from './resources/user';
import { sessionRouter } from './resources/session';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
restRouter.use('/session', sessionRouter);
// restRouter.use('/exercise', exerciseRouter);
