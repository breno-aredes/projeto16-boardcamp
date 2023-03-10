import express from "express";
import cors from "cors";
import { customersRouter } from "./routes/customers.Routes.js";
import { gamesRouter } from "./routes/games.Routes.js";
import { rentalsRouter } from "./routes/rentals.Routes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use([customersRouter, gamesRouter, rentalsRouter]);

const PORT = 5000;

server.listen(PORT, console.log("O servidor esta conectado na porta 5000"));
