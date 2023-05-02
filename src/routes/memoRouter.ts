import { Router } from 'express';
import { db } from '../index';
import { isModuleNamespaceObject } from 'util/types';
// import { IAddTaskPayload } from '../custom-types/payload-types';

const memoRouter = Router();

memoRouter.get('/', async (req, res) => {
  try {
    const [memos] = await db.query(
      `SELECT memo.id,board.board_name, colour.colour_name , memo.memo_content 
    FROM memo 
    LEFT JOIN colour ON memo.memo_colour_id=colour.id LEFT JOIN board ON memo.memo_board_id=board.id;`
    );
    //---------I think this condition is not working

    if (memos) res.json(memos);
    else throw new Error('No memo found!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});
memoRouter.get('/byboardname/:boardName', async (req, res) => {
  const { boardName } = req.params;
  try {
    const [memos] = await db.query(
      `SELECT memo.id,board.board_name,memo.memo_board_id, colour.colour_name , memo.memo_content 
    FROM memo 
    LEFT JOIN colour ON memo.memo_colour_id=colour.id LEFT JOIN board ON memo.memo_board_id=board.id
    WHERE board.board_name=?;`,
      [boardName]
    );
    if (memos) res.json(memos);
    else throw new Error('No memo found wit this board id!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoRouter.get('/byboardid/:boardId', async (req, res) => {
  const { boardId } = req.params;
  try {
    const [memos] = await db.query(
      `SELECT memo.id,board.board_name,memo.memo_board_id, colour.colour_name , memo.memo_content 
    FROM memo 
    LEFT JOIN colour ON memo.memo_colour_id=colour.id LEFT JOIN board ON memo.memo_board_id=board.id
    WHERE board.id=?;`,
      [boardId]
    );
    if (memos) res.json(memos);
    else throw new Error('No memo found wit this board id!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [memo] = await db.query(
      `
      SELECT memo.id,board.board_name, colour.colour_name , memo.memo_content 
    FROM memo 
    LEFT JOIN colour ON memo.memo_colour_id=colour.id LEFT JOIN board ON memo.memo_board_id=board.id
      WHERE id=?
    `,
      [parseInt(id)]
    );

    if (memo) res.json(memo);
    else throw new Error('No memo found with this id!');
  } catch (err) {
    console.warn(err);
    res.status(404).send({});
  }
});

memoRouter.post('/', async (req, res) => {
  const { colour, content, board } = req.body;
  try {
    const [resSql] = await db.query(
      `
    INSERT INTO memo (memo_colour_id, memo_content, memo_board_id)
    VALUES (?,?,?)
  `,
      [colour, content, board]
    );
    res
      .status(201)
      .json({ message: 'Your memo has been added', resSql: resSql });
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `
    DELETE FROM memo
    WHERE id=?
    `,
      [id]
    );
    res.status(204).send();
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoRouter.put('/:id', async (req, res) => {
  const { colour, content, board } = req.body;
  const { id } = req.params;
  const [resSql] = await db.query(
    `
    UPDATE memo
    SET memo_colour_id=?, memo_content=?, memo_board_id=?
    WHERE id=?
  `,
    [colour, content, board, id]
  );
  res
    .status(204)
    .json({ message: 'Your memo has been updated', resSql: resSql });
});

export default memoRouter;
