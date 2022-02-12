import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addExpenseSchema } from "../schemas";

export async function addExpenseReqValidator(req: Request, res: Response, next: NextFunction) {

  try {
    await addExpenseSchema.validateAsync(req.body)
    next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
}
