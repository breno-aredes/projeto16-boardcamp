import { Router } from "express";
import {
  attRentals,
  deleteRentals,
  listRentals,
  newRentals,
} from "../controllers/rentalsController.js";
import {
  rentalsAttValidate,
  rentalsDeleteValidate,
  rentalsValidate,
} from "../middlewares/rentalsValidation.js";
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
rentalsRouter.put("/rentals/:id/return", rentalsAttValidate, attRentals);
rentalsRouter.delete("/rentals/:id?", rentalsDeleteValidate, deleteRentals);
