import { Router } from "express";
import { listGames, newGames } from "../controllers/gamesController.js";

export const gamesRouter = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", newGames);
