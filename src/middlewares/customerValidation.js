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

export async function attCustomerValidate(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;
  try {
    const customerCpf = await db.query(
      "SELECT * FROM customers where cpf = $1",
      [cpf]
    );
    const customerId = await db.query("SELECT * FROM customers where id = $1", [
      id,
    ]);
    if (customerCpf.rowCount) {
      if (customerId.rows[0].cpf !== cpf) return res.sendStatus(409);
      next();
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
