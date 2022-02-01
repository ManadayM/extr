import config from "config";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { BaseUser } from "../models";
import { UserService } from "../services";

const PRIVATE_KEY: string = config.get('server.jwtSecret');

export const register = async (req: Request, res: Response) => {
  const userRecord: BaseUser = req.body;
  try {
    const user = await UserService.create(userRecord);
    const token = sign({ email: user.email }, PRIVATE_KEY, { expiresIn: '24h' });

    return res.status(StatusCodes.CREATED).send({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const login = async (req: Request, res: Response) => {

};
