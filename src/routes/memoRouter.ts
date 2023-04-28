import { Router } from 'express';
import { db } from '../index';
// import { IAddTaskPayload } from '../custom-types/payload-types';

const memoRouter = Router();

memoRouter.get('/', async (req, res) => {
  const [memos] = await db.query(
    `SELECT memo.id,board.board_name, colour.colour_name , memo.memo_content 
    FROM memo 
    LEFT JOIN colour ON memo.memo_colour_id=colour.id LEFT JOIN board ON memo.memo_board_id=board.id;`
  );
  res.json(memos);
});

memoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [memo] = await db.query(
      `
      SELECT *
      FROM memo 
      WHERE id=?
    `,
      [parseInt(id)]
    );

    if (memo) res.json(memo);
    else throw new Error('No memo found!');
  } catch (err) {
    console.warn(err);
    res.status(404).send({});
  }
});

memoRouter.post('/', async (req, res) => {
  const { colour, content, board } = req.body;

  const resSql = await db.query(
    `
    INSERT INTO memo (memo_colour_id, memo_content, memo_board_id)
    VALUES (?,?,?)
  `,
    [colour, content, board]
  );
  res.status(201).send('Your memo has been created');
});

memoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query(
    `
    DELETE FROM memo
    WHERE id=?
    `,
    [id]
  );
  res.status(204).send();
});

memoRouter.put('/:id', async (req, res) => {
  const { colour, content, board } = req.body;
  const { id } = req.params;
  const resSql = await db.query(
    `
    UPDATE memo
    SET memo_colour_id=?, memo_content=?, memo_board_id=?
    WHERE id=?
  `,
    [colour, content, board, id]
  );
  res.status(204).send();
});

export default memoRouter;
