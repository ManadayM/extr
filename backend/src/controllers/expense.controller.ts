import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

import { ExpenseService } from "../services";
import { BaseExpense } from "../models";

export const addExpense = async (req: Request, res: Response) => {

  // TODO: extract user id from the request.
  // { amount: 10.76, categoryId: 10, userId: 23, expenseDate: '2022-01-22' }
  const expenseRecord: BaseExpense = req.body;

  try {
    const expense = await ExpenseService.create(expenseRecord);

    return res.status(StatusCodes.CREATED).send(expense);

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }

}

export const getAllExpenses = async (req: Request, res: Response) => {

  try {
    const expenses = await ExpenseService.findAll();

    return res.status(StatusCodes.OK).send(expenses);

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};