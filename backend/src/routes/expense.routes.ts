import { Router } from 'express';
import { addExpense, getAllExpenses, getExpenseById } from '@controllers';
import { addExpenseReqValidator } from '@middlewares';

const expensesRouter = Router();

expensesRouter
  .get('/', getAllExpenses)
  .get('/:id', getExpenseById)
  .post('/', addExpenseReqValidator, addExpense);

export default expensesRouter;
