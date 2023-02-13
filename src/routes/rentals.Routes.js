import { Router } from "express";
import { listRentals, newRentals } from "../controllers/rentalsController.js";
import { rentalsValidate } from "../middlewares/rentalsValidation.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { rentalsSchema } from "../models/rentalsSchema.js";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post(
  "/rentals",
  validateSchema(rentalsSchema),
  rentalsValidate,
  newRentals
);
