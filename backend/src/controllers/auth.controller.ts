import config from 'config';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { IBaseUser } from '@models';
import { logger, UserService } from '@services';

const JWT_SECRET: string = config.get('server.jwtSecret');
const JWT_EXPIRES_IN: string = config.get('server.jwtExpiresIn');

const generateToken = ({ id, email }: { id: number, email: string }) => {
  return sign({ id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const register = async (req: Request, res: Response) => {
  const userRecord: IBaseUser = req.body;
  try {
    const user = await UserService.create(userRecord);
    const token = generateToken(user);

    return res.status(StatusCodes.CREATED).send({ token });
  } catch (error) {
    logger.error(`register: ${error}`);
    return res.status(StatusCodes.BAD_REQUEST).send({ error: true, message: 'Bad request or user already exist.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const userCredential: IBaseUser = req.body;

  try {
    const user = await UserService.findByEmail(userCredential.email);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: true, message: 'User does not exist.' });
    }

    const passwordIsValid = await compare(userCredential.password, user.password);
    if (!passwordIsValid) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: true, message: 'Invalid username or password.' });
    }

    const token = generateToken(user);
    return res.status(StatusCodes.OK).send({ token });
  } catch (error) {
    logger.error(`login: ${error}`);
    return res.status(StatusCodes.BAD_REQUEST).send({ error: true, message: 'Bad request.' });
  }
};
