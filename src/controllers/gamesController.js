import { db } from "../database/database.connection.js";

export async function listGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games;");
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function newGames(req, res) {}
