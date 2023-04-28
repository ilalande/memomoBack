import { Config } from '../custom-types/server';

require('dotenv').config();
const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD, PORT } = process.env;
export const config: Config = {
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
  },
  port: PORT,
};
