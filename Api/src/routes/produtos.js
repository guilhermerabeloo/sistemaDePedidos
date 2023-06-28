import express from "express";
import ProdutoController from "../controllers/produtos.js";

const router = express.Router();

router
    .get("/produtos", ProdutoController.listagemDeProdutos)
    .get("/ingredientes", ProdutoController.listagemDeIngredientes)
    .get("/categorias", ProdutoController.listagemDeCategorias)
    .get("/consultaProduto/:Id", ProdutoController.consultaDeProduto)
    .get("/consultaIngredientesProduto/:IdProduto", ProdutoController.consultaDeIngredientesProduto)
    .post("/cadastraProduto", ProdutoController.cadastroDeProdutos)
    .post("/cadastraCategoria", ProdutoController.cadastroDeCategorias)
    .post("/cadastraSituacaoProduto", ProdutoController.cadastroDeSituacoesProduto)
    .post("/cadastraIngrediente", ProdutoController.cadastrarIngrediente)
    .post("/associaIngrediente/:idProduto", ProdutoController.relacionarIngredienteProduto)
    .post("/excluiIngredienteProduto/:IdProduto", ProdutoController.exclusaoDeIngredienteDoProduto)
    .put("/alteraProduto/:Id", ProdutoController.alteracaoDeProduto)
    .delete("/excluiProduto/:IdProduto", ProdutoController.exclusaoDeProduto)

export default router;
