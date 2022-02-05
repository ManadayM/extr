import { Router } from "express";

import expensesRouter from './expense.routes';
import authRouter from './auth.routes';
import { authorize } from "../middlewares";

const routes = Router();
routes.use('/expenses', authorize, expensesRouter);
routes.use('/auth', authRouter);

export default routes;
