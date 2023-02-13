import { db } from "../database/database.connection.js";

export async function listCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers;");
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function listCustomersById(req, res) {
  const { id } = req.params;
  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [
      id,
    ]);
    if (!customer.rowCount) return res.sendStatus(404);
    res.send(customer.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function newCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4);`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function attCustomers(req, res) {}
