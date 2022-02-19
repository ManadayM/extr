export type DBConfig = {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
};

export type ServerConfig = {
  port: number;
  jwtSecret: string;
  cors?: {
    origin?: string;
    methods?: string;
    allowedHeaders?: string;
    exposedHeaders?: string;
    credentials?: string;
  }
}

export type AppConfig = {
  db: DBConfig;
  server: ServerConfig;
};
