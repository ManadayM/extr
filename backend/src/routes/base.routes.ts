import { Router } from 'express';

import { authorize } from '@middlewares';
import expensesRouter from './expense.routes';
import authRouter from './auth.routes';
import categoryRouter from './category.routes';

const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/categories', authorize, categoryRouter);
baseRouter.use('/expenses', authorize, expensesRouter);

export default baseRouter;
