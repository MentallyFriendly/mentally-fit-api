import * as express from 'express';
import setupMiddleware from './middleware';
import { Request, Response } from 'express';

const app = express();

setupMiddleware(app);
// connect()

app.get(
  '/',
  (req: Request, res: Response): void => {
    res.json({ ok: false });
  }
);

export default app;
