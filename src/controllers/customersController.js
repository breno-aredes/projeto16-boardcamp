import { db } from "../database/database.connection.js";

export async function listCustomers(req, res) {
  try {
    const costumers = await db.query("SELECT * FROM costumers;");
    res.send(costumers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function newCustomers(req, res) {}

export async function attCustomers(req, res) {}
