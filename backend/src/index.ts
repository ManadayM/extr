import config from "config";
import db from "./db";
import app from "./app";

import { DBConfig, ServerConfig } from "./types";
import { logger } from "./services";
import { Server } from "http";

const dbConfig: DBConfig = config.get("db");
const serverConfig: ServerConfig = config.get("server");

let server: Server;

// Start listening only when you've made to the database! ¯\_(ツ)_/¯
app.on("dbConnected", () => {
  const PORT = serverConfig.port || 8080;
  server = app.listen(PORT, () => logger.info(`App is listening on port ${PORT}.`));
});

db.connect({
  database: dbConfig.name,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
})
  .then(() => {
    logger.info("Database connected.");
    app.emit("dbConnected");
  })
  .catch((err) => console.error(err));

function gracefulShutdown() {
  logger.info("Closing http server.");
  server.close(() => {
    logger.info("Http server closed.");

    db.close().then(() => {
      logger.info("database connection closed.");
      logger.info("Bye bye!");
      process.exit(0);
    });
  });
}
// process.stdin.resume();
process.on("SIGINT", () => {
  logger.info("SIGINT signal received.");
  gracefulShutdown();
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  gracefulShutdown();
});
