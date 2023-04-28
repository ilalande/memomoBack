import { Router } from 'express';
import { db } from '../index';
// import { IAddTaskPayload } from '../custom-types/payload-types';

const memoRouter = Router();

memoRouter.get('/', async (req, res) => {
  const [memos] = await db.query(`SELECT * FROM memo;`);
  res.json(memos);
});

export default memoRouter;
