import { Router } from "express";
import { addExpense, getAllExpenses } from "../controllers";
import { addExpenseReqValidator } from "../middlewares";

const expensesRouter = Router();

expensesRouter

  .get('/', getAllExpenses)

  // TODO: validate schema (Joi).
  .post('/', addExpenseReqValidator, addExpense);

export default expensesRouter;
