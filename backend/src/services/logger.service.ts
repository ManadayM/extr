import { createLogger, transports, format } from 'winston';
import config from 'config';

const LOG_LEVEL: string = config.get('server.logLevel');

// Default log levels in Winston
// {
//   "error": 0,
//   "warn": 1,
//   "info": 2,
//   "http": 3,
//   "verbose": 4,
//   "debug": 5,
//   "silly": 6
// }

const logLevels = {
  fatal: 0, /* catastrophic situations. */
  error: 1, /* error conditions that halts an operation, but not the system. */
  warn: 2, /* undesirable or unusual conditions, but not errors. */
  info: 3, /* informative msgs */
  http: 4, /* http request logs */
  debug: 5, /* diagnostic information to troubleshoot */
  trace: 6, /* minute app details during development */
};

export const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: LOG_LEVEL,
      filename: './logs/extr.log',
      handleExceptions: true,
      maxsize: 5242880, //5MB
      maxFiles: 5
    }),
    new transports.Console({
      level: LOG_LEVEL,
      handleExceptions: true
    })
  ],
  exitOnError: false
});
