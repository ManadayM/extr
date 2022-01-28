import { Router } from "express";
import { addExpense, getAllExpenses } from "../controllers";

const expensesRouter = Router();

expensesRouter

  .get('/', getAllExpenses)

  // TODO: validate schema (Joi).
  .post('/', addExpense);

export default expensesRouter;
