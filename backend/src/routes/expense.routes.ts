import { Router } from 'express';
import { addExpense, getAllExpenses, getExpenseById, updateExpense } from '@controllers';
import { addExpenseReqValidator } from '@middlewares';

const expensesRouter = Router();

expensesRouter
  .get('/', getAllExpenses)
  .get('/:id', getExpenseById)
  .post('/', addExpenseReqValidator, addExpense)
  .put('/:id', addExpenseReqValidator, updateExpense);

export default expensesRouter;
