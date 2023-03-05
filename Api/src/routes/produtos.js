import express from "express";
import ProdutoController from "../controllers/produtos.js";

const router = express.Router();

router
    .get("/produtos", ProdutoController.listagemDeProdutos)
    .post("/cadastraProduto", ProdutoController.cadastroDeProdutos)
    .post("/cadastraCategoria", ProdutoController.cadastroDeCategorias)
    .post("/cadastraSituacaoProduto", ProdutoController.cadastroDeSituacoesProduto)
    .post("/cadastraIngrediente", ProdutoController.cadastrarIngrediente)
    .post("/associaIngrediente/:idProduto/:idIngrediente", ProdutoController.relacionarIngredienteProduto)

export default router;

