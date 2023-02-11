import express from "express";
import listagemController from "../controllers/produtos.js";

const router = express.Router();

router
    .get("/produtos", listagemController)

export default router;

