import * as express from 'express';
import setupMiddleware from './middleware';
require('dotenv').config();
import { Request, Response } from 'express';
import { restRouter } from './api';
import { connect } from './db';

const app = express();

setupMiddleware(app);
connect();

app.use('/api', restRouter);

// catch all if route not found
app.all(
  '*',
  (req: Request, res: Response): void => {
    res.json({ message: 'route not found' });
  }
);

export default app;
