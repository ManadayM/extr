import { Response } from "express";
import StatusCodes from "http-status-codes";

import { ExpenseService, logger } from "../services";
import { BaseExpense } from "../models";

export const addExpense = async (req: any, res: Response) => {
  // { amount: 10.76, categoryId: 10, userId: 23, expenseDate: '2022-01-22' }
  const expenseRecord: BaseExpense = { ...req.body, userId: req.user.id };

  try {
    const expense = await ExpenseService.create(expenseRecord);
    return res.status(StatusCodes.CREATED).send(expense);
  } catch (error) {
    logger.error(`addExpense: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: true, message: 'Internal server error.' });
  }
};


export const getAllExpenses = async (req: any, res: Response) => {

  try {
    const expenses = await ExpenseService.findAll(req.user.id);
    return res.status(StatusCodes.OK).send(expenses);
  } catch (error) {
    logger.error(`getAllExpenses: ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: true, message: 'Internal server error.' });
  }
};
