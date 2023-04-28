export interface Config {
  db: {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
  };
  port: string | undefined;
}
