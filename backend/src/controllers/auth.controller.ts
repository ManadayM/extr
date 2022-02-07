import config from "config";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { BaseUser } from "../models";
import { UserService } from "../services";

const JWT_SECRET: string = config.get('server.jwtSecret');

const generateToken = ({ id, email }: { id: number, email: string }) => {
  return sign({ id, email }, JWT_SECRET, { expiresIn: '24h' });
};

export const register = async (req: Request, res: Response) => {
  const userRecord: BaseUser = req.body;
  try {
    const user = await UserService.create(userRecord);
    const token = generateToken(user);

    return res.status(StatusCodes.CREATED).send({ token });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: true, message: 'Bad request or user already exist.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const userCredential: BaseUser = req.body;

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
    return res.status(StatusCodes.BAD_REQUEST).send({ error: true, message: 'Bad request.' });
  }
};
