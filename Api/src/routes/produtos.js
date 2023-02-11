import express from "express";
import ProdutoController from "../controllers/produtos.js";

const router = express.Router();

router
    .get("/produtos", ProdutoController.listagemDeProdutos)
    .post("/cadastraProduto", ProdutoController.cadastroDeProdutos)

export default router;

