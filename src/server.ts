import { Request, Response } from 'express';
import setupMiddleware from './middleware';
import { restRouter } from './api';
import { connect } from './db';
import { verifyUser, signin, protect } from './api/modules/auth';
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

const mode = process.env.NODE_ENV ? 'development' : 'production';

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
