import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { logger, ExpenseService } from '@services';
import { IBaseExpense, IExpense } from '@models';

export const addExpense = async (req: any, res: Response) => {
  // { amount: 10.76, categoryId: 10, userId: 23, expenseDate: '2022-01-22' }
  const expenseRecord: IBaseExpense = { ...req.body, userId: req.user.id };

  try {
    const expense = await ExpenseService.create(expenseRecord);
    return res.status(StatusCodes.CREATED).send(expense);
  } catch (error) {
    logger.error(`addExpense: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: 'Internal server error.' });
  }
};

export const updateExpense = async (req: any, res: Response) => {
  // { amount: 10.76, categoryId: 10, userId: 23, expenseDate: '2022-01-22' }

  const expenseRecord: IExpense = { ...req.body, id: req.params.id, userId: req.user.id };

  try {
    await ExpenseService.update(expenseRecord);
    return res.status(StatusCodes.OK).send();
  } catch (error) {
    logger.error(`updateExpense: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: 'Internal server error.' });
  }
};

export const getAllExpenses = async (req: any, res: Response) => {
  let { month , year } = req.query;
  if(!month) {
    month = (new Date()).getMonth() + 1;
  }
  if(!year) {
    year = (new Date()).getFullYear();
  }
  try {
    const expenses = await ExpenseService.findAll(req.user.id, month, year);
    return res.status(StatusCodes.OK).send(expenses);
  } catch (error) {
    logger.error(`getAllExpenses: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: 'Internal server error.' });
  }
};

export const getExpenseById = async (req: any, res: Response) => {
  try {
    const expense = await ExpenseService.findOne(req.user.id, req.params.id);
    if (expense) {
      return res.status(StatusCodes.OK).send(expense);
    }
    return res.status(StatusCodes.NOT_FOUND).send();
  } catch (error) {
    logger.error(`getExpenseById: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: 'Internal server error.' });
  }
};

export const deleteExpense = async (req: any, res: Response) => {
  // TODO: return error if expense is already deleted
  try {
    await ExpenseService.remove(req.params.id, req.user.id);
    return res.status(StatusCodes.ACCEPTED).send();
  } catch (error) {
    logger.error(`deleteExpense: ${error}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: 'Internal server error.' });
  }
};
