import { Router } from "express";

import expensesRouter from './expenses';

const routes = Router();
routes.use('/expenses', expensesRouter);

export default routes;
