import { Router } from "express";

import expensesRouter from './expense.routes';
import authRouter from './auth.routes';

const routes = Router();
routes.use('/expenses', expensesRouter);
routes.use('/auth', authRouter);

export default routes;
