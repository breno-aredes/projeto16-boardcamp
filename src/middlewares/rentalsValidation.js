import { db } from "../database/database.connection.js";

export async function rentalsValidate(req, res, next) {
  const { customerId, gameId } = req.body;
  try {
    const game = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
    const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [
      customerId,
    ]);
    const rentedGames = await db.query(
      'SELECT * FROM rentals JOIN games ON rentals."gameId" = games.id WHERE games.id=$1 AND rentals."returnDate" IS NULL;',
      [gameId]
    );

    if (!game.rowCount || !customer.rowCount) return res.sendStatus(400);
    if (game.rows[0].stockTotal <= rentedGames.rowCount) {
      return res.sendStatus(400);
    }
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rentalsAttValidate(req, res, next) {
  const { id } = req.params;
  try {
    const rental = await db.query("SELECT * FROM rentals WHERE id=$1;", [id]);

    if (!rental.rowCount) return res.sendStatus(404);
    if (rental.rows[0].returnDate) return res.sendStatus(400);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rentalsDeleteValidate(req, res, next) {
  const { id } = req.params;
  try {
    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
    if (!rental.rowCount) return res.sendStatus(404);
    if (!rental.rows[0].returnDate) return res.sendStatus(400);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
