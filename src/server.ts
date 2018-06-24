import * as express from 'express';
import setupMiddleware from './middleware';
import { Request, Response } from 'express';
import { restRouter } from './api';
import { connect } from './db';

const app = express();

const mode = process.env.NODE_ENV ? 'development' : 'production';

setupMiddleware(app);
connect();

app.use('/api', restRouter);

// catch all if route not found
app.all(
  '*',
  (req: Request, res: Response): void => {
    res.json({ message: 'Route not found' });
  }
);

export default app;
