import config from "config";
import db from "./db";
import app from "./app";

import { DBConfig, ServerConfig } from "./types";

const dbConfig: DBConfig = config.get('db');
const serverConfig: ServerConfig = config.get('server');

// Start listening only when you've made to the database! ¯\_(ツ)_/¯
app.on('dbConnected', () => {
  const PORT = serverConfig.port || 8080;
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));
});

db.connect({
  database: dbConfig.name,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password
})
  .then(() => app.emit('dbConnected'))
  .catch((err) => console.error(err));