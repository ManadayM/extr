import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'http',
      filename: './logs/extr.log',
      handleExceptions: true,
      maxsize: 5242880, //5MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true
    })
  ],
  exitOnError: false
});
