import { db } from "../database/database.connection.js";

export async function customerValidate(req, res, next) {
  const { cpf } = req.body;
  try {
    const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
      cpf,
    ]);
    if (customer.rowCount) return res.sendStatus(409);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
