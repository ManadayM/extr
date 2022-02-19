import { Router } from "express";
import { addExpense, getAllExpenses } from "@controllers";
import { addExpenseReqValidator } from "@middlewares";

const expensesRouter = Router();

expensesRouter
  .get('/', getAllExpenses)
  .post('/', addExpenseReqValidator, addExpense);

export default expensesRouter;
