import { Router } from "express";
import { listGames, newGames } from "../controllers/gamesController.js";
import { gameValidate } from "../middlewares/gameValidation.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { gameSchema } from "../models/gamesSchema.js";

export const gamesRouter = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", gameValidate, validateSchema(gameSchema), newGames);
