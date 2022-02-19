import { Router } from 'express';

import baseRouter from './base.routes';

const routes = Router();

routes.use('/api', baseRouter);

export default routes;
