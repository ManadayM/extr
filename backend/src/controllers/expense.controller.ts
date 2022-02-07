import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

import { ExpenseService } from "../services";
import { BaseExpense } from "../models";

export const addExpense = async (req: any, res: Response) => {

  // TODO: extract user id from the request.
  // { amount: 10.76, categoryId: 10, userId: 23, expenseDate: '2022-01-22' }
  const expenseRecord: BaseExpense = { ...req.body, userId: req.user.id };

  try {
    const expense = await ExpenseService.create(expenseRecord);

    return res.status(StatusCodes.CREATED).send(expense);

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

export const getAllExpenses = async (req: any, res: Response) => {

  try {
    const expenses = await ExpenseService.findAll(req.user.id);

    return res.status(StatusCodes.OK).send(expenses);

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};
