import { db } from "../database/database.connection.js";

export async function rentalsValidate(req, res, next) {
  const { customerId, gameId } = req.body;
  try {
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      customerId,
    ]);
    const rentedGames = await db.query(
      'SELECT count(id) as quantity FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL',
      [gameId]
    );

    if (!game.rowCount || !customer.rowCount) return res.sendStatus(409);
    if (game.stockTotal <= rentedGames.rowCount) return res.sendStatus(400);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
