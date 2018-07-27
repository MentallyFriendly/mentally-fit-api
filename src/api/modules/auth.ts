import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import { User } from '../resources/user/user.model';
import { config } from '../../config/dev';

const checkToken = expressJwt({ secret: config.secrets.JWT_SECRET });

export const signin = (req: Request, res: Response) => {
  const token = signToken(req.user.id);
  res.json({ token: token });
};

export const decodeToken = () => (req: Request, res: Response, next: NextFunction) => {
  if (config.disableAuth) {
    return next();
  }

  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }

  checkToken(req, res, next);
};

export const getFreshUser = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      res.status(401).send('Unauthorized');
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const verifyUser = () => async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send('You need a username and password');
    return;
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).send('No user registered with the given email');
    } else {
      if (!user.authenticate(password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

export const signToken = (id: string) => {
  return sign({ id }, config.secrets.JWT_SECRET, { expiresIn: config.expireTime });
};

export const protect = [decodeToken(), getFreshUser()];
