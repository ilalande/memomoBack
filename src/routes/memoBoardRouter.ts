import { Router } from 'express';
import { db } from '../index';

const memoBoardRouter = Router();

memoBoardRouter.get('/', async (req, res) => {
  try {
    const [memoBoards] = await db.query(
      `SELECT board.id, board.board_name
    FROM board;`
    );
    //---------I think this condition is not working
    if (memoBoards) res.json(memoBoards);
    else throw new Error('No boards found!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoBoardRouter.get('/byboardname/:boardName', async (req, res) => {
  const { boardName } = req.params;
  try {
    const [boardDatas] = await db.query(
      `SELECT board.id, board.board_name
    FROM board
    WHERE board.board_name=?;`,
      [boardName]
    );
    if (boardDatas) res.json(boardDatas);
    else throw new Error('No board found wit this board name!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoBoardRouter.get('/byboardid/:boardId', async (req, res) => {
  const { boardId } = req.params;
  try {
    const [boardDatas] = await db.query(
      `SELECT board.id, board.board_name
    FROM board
    WHERE board.id=?;`,
      [boardId]
    );
    if (boardDatas) res.json(boardDatas);
    else throw new Error('No board found wit this board name!');
  } catch (err) {
    console.warn(err);
    res.status(404).send();
  }
});

memoBoardRouter.post('/', async (req, res) => {
  const { boardName } = req.body;
  //In databse, board_name is unique
  try {
    const [resSql] = await db.query(
      `
    INSERT INTO board (board_name)
    VALUES (?)
  `,
      [boardName]
    );
    res
      .status(201)
      .json({ message: 'Your board has been added', resSql: resSql });
  } catch (err) {
    console.warn(err);
    res.status(404).send(err);
  }
});
export default memoBoardRouter;
