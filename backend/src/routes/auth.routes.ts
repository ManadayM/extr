import { Request, Response, Router } from "express";
import { register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter
  .post('/register', register)
  .post('/login', async (req: Request, res: Response) => {
  });

export default authRouter;
