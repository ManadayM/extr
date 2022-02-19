import { Router } from 'express';
import { authSchemaValidator } from '@middlewares';
import { login, register } from '@controllers';

const authRouter = Router();

authRouter
  .use(authSchemaValidator)
  .post('/register', register)
  .post('/login', login);

export default authRouter;
