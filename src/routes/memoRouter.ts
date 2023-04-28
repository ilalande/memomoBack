import { Router } from 'express';
// import { IAddTaskPayload } from '../custom-types/payload-types';

const memoRouter = Router();

memoRouter.get('/', async (req, res) => {
  res.send('bip bloup');
});

export default memoRouter;
