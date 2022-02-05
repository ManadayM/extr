import config from "config";
import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { verify } from "jsonwebtoken";

const JWT_SECRET: string = config.get('server.jwtSecret');

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] as string;

  if(!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: true, message: 'Authentication token required.' });
  }

  try {
      const decoded = verify(token, JWT_SECRET);
      console.log(`decoded: ${decoded}`)
  } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: true, message: 'Authentication token required.' });
  }


  next();
}
