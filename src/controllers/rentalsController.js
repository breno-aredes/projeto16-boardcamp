import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function listRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT rentals.*,
    json_build_object('id', customers.id, 'name', customers.name) AS customer,
    json_build_object('id', games.id, 'name', games.name) AS game
    FROM rentals
    JOIN games ON rentals."gameId" = games.id
    JOIN customers ON rentals."customerId" = customers.id;
    `);
    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function newRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const game = await db.query('SELECT * FROM games WHERE "id" = $1;', [gameId]);
  const originalPrice = daysRented * game.rows[0].pricePerDay;
  try {
    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, null, $5, null);',
      [
        customerId,
        gameId,
        dayjs().format("YYYY-MM-DD"),
        daysRented,
        originalPrice,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function attRentals(req, res) {
  const { id } = req.params;

  try {
    const rental = await db.query('SELECT * FROM rentals WHERE "id" = $1;', [
      id,
    ]);
    const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [
      rental.rows[0].gameId,
    ]);

    const returnDate = dayjs().format("YYYY-MM-DD");

    const oneDay = 1000 * 60 * 60 * 24;
    const pastDays = Math.floor(
      (new Date(returnDate) - new Date(rental.rows[0].rentDate)) / oneDay
    );

    let delayFee =
      (pastDays - rental.rows[0].daysRented) * game.rows[0].pricePerDay;
    if (delayFee <= 0) delayFee = null;

    await db.query(
      `UPDATE rentals SET "returnDate"=$1,"delayFee"=$2 WHERE id=$3;`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
