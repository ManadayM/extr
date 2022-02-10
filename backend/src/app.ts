import cors from "cors";
import helmet from "helmet";
import express, { Application, Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import morgan from "morgan";

import { logger } from "./services";
import routes from "./routes";

const app: Application = express();

/**
 * App config
 */
app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * App middlewares
 */
app.use(morgan('combined', {
  stream: {
    write: (msg: string) => logger.http(msg)
  }
}));

/**
 * App routes
 */
app.use(routes);

/**
 * Catch any unhandled exception
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message
  });
});

export default app;
