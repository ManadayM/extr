import { Router } from 'express';
import { addExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from '@controllers';
import { addExpenseReqValidator } from '@middlewares';

const expensesRouter = Router();

expensesRouter
  .get('/', getAllExpenses)
  .get('/:id', getExpenseById)
  .post('/', addExpenseReqValidator, addExpense)
  .put('/:id', addExpenseReqValidator, updateExpense)
  .delete('/:id', deleteExpense);

export default expensesRouter;
