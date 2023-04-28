import express, { Express, Request, Response } from 'express';
import { config } from './config';
import cors from 'cors';

import memoRoutes from './routes/memoRouter';
const app: Express = express();
app.use(cors());
app.use(express.json());

//Link to database
const mysql = require('mysql2/promise');
const db = mysql.createPool(config.db);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello there !');
});

app.listen(config.port, () =>
  console.log(`⚡️Server runnning http://localhost:${config.port}`)
);

app.use('/memos', memoRoutes);
