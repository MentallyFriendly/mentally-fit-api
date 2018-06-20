import { urlencoded, json } from 'body-parser';
import { Express } from 'express';

const setGlobalMiddleware = (app: Express) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
};

export default setGlobalMiddleware;
