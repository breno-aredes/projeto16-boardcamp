import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

//server.use([])

const PORT = 5000;
server.listen(PORT);
