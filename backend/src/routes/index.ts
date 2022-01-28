import { Router } from "express";

import expensesRouter from './expense.routes';

const routes = Router();
routes.use('/expenses', expensesRouter);

export default routes;
