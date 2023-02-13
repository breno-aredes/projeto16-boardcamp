import { Router } from "express";
import {
  newCustomers,
  listCustomers,
  attCustomers,
  listCustomersById,
} from "../controllers/customersController.js";

export const customersRouter = Router();

customersRouter.get("/customoers", listCustomers);
customersRouter.get("/customers/:id?", listCustomersById);
customersRouter.post("/customers", newCustomers);
customersRouter.put("/customers", attCustomers);
