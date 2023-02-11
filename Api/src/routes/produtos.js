import express from "express";
import ProdutoController from "../controllers/produtos.js";

const router = express.Router();

router
    .get("/produtos", ProdutoController.listagemController)

export default router;

