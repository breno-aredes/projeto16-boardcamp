import { Router } from "express";
import { listRentals, newRentals } from "../controllers/rentalsController.js";
import { rentalsValidate } from "../middlewares/rentalsValidation.js";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals", rentalsValidate, newRentals);
