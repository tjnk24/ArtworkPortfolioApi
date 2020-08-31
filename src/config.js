import { resolve } from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  const env = dotenv.config().parsed;
  console.log(env);
}

const config = {
  port: 80,
  uploadDir: `${resolve(__dirname, '..')}/uploads/`,
  database: {
    username: process.env.CLEARDB_USER,
    password: process.env.CLEARDB_PASS,
    host: process.env.CLEARDB_HOST,
    port: process.env.CLEARDB_PORT,
    dialect: 'mysql',
    database: process.env.CLEARDB_SCHEMA,
  },
};

export default config;
