import { Request, Response } from 'express';
import setupMiddleware from './middleware';
import { restRouter } from './api';
import { connect } from './db';
import { verifyUser, signin, protect } from './api/modules/auth';
import * as express from 'express';
import * as morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

setupMiddleware(app);
connect();

app.use('/signin', verifyUser(), signin);
app.use('/api', protect, restRouter);

// catch all if route not found
app.all(
  '*',
  (req: Request, res: Response): void => {
    res.json({ message: 'Route not found' });
  }
);

export default app;
