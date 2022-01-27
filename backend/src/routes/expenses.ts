import { Request, Response, Router } from "express";

const expensesRouter = Router();

expensesRouter.get('/', async (req: Request, res: Response) => {

  // Send the result back to the person
  // who made this request.
  res.status(200).send('Hello world!');
});

export default expensesRouter;
