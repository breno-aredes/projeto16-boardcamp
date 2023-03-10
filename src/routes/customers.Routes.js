import { Router } from "express";
import {
  newCustomers,
  listCustomers,
  attCustomers,
  listCustomersById,
} from "../controllers/customersController.js";
import {
  attCustomerValidate,
  customerValidate,
} from "../middlewares/customerValidation.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { customerSchema } from "../models/customerSchema.js";

export const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id?", listCustomersById);
customersRouter.post(
  "/customers",
  customerValidate,
  validateSchema(customerSchema),
  newCustomers
);
customersRouter.put(
  "/customers/:id?",
  validateSchema(customerSchema),
  attCustomerValidate,
  attCustomers
);
