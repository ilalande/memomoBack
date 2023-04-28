import { Router } from 'express';
import { db } from '../index';

const memoBoardRouter = Router();

memoBoardRouter.get('/', async (req, res) => {
  const [memoBoards] = await db.query(
    `SELECT board.id, board.board_name
    FROM board;`
  );
  res.json(memoBoards);
});

memoBoardRouter.post('/', async (req, res) => {
  const { boardName } = req.body;

  const resSql = await db.query(
    `
    INSERT INTO board (board_name)
    VALUES (?)
  `,
    [boardName]
  );
  res.status(201).send('Your boardhas been created');
});
export default memoBoardRouter;
