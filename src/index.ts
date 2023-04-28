import express, { Express, Request, Response } from 'express';
import { config } from './config';
import cors from 'cors';
import mysql from 'mysql2/promise';
import memoRoutes from './routes/memoRouter';
import memoBoardRouter from './routes/memoBoardRouter';

const app: Express = express();
app.use(cors());
app.use(express.json());

//Link to database
export const db = mysql.createPool(config.db);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello there !');
});

app.listen(config.port, () =>
  console.log(`⚡️Server runnning http://localhost:${config.port}`)
);

app.use('/memos', memoRoutes);
app.use('/boards', memoBoardRouter);
