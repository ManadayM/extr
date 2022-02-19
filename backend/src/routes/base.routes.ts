import { Router } from "express";

import { authorize } from "@middlewares";
import expensesRouter from "./expense.routes";
import authRouter from "./auth.routes";

const baseRouter = Router();
baseRouter.use('/expenses', authorize, expensesRouter);
baseRouter.use('/auth', authRouter);

export default baseRouter;
