import { Router } from "express";
import { listRentals, newRentals } from "../controllers/rentalsController";
import { rentalsValidate } from "../middlewares/rentalsValidation";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals", rentalsValidate, newRentals);
