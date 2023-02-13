import { db } from "../database/database.connection";

export async function gameValidate(req, res, next) {
  try {
    const { name } = req.body;
    const game = await db.query("SELECT * FROM games WHERE name = $1", [name]);
    if (game) res.sendStatus(409);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
