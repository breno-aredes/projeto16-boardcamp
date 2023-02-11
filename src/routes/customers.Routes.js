import { Router } from "express";
import {
  newCustomers,
  listCustomers,
  attCustomers,
} from "../controllers/customersController,js";

export const customersRouter = Router();

customersRouter.get("/customoers", listCustomers);
customersRouter.post("/customers", newCustomers);
customersRouter.put("/customers", attCustomers);
