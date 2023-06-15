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
    .post("/associaIngrediente/:idProduto/:idIngrediente", ProdutoController.relacionarIngredienteProduto)
    .put("/alteraProduto/:Id", ProdutoController.alteracaoDeProduto)
    .delete("/excluiIngredienteProduto/:IdProduto/:IdIngrediente", ProdutoController.exclusaoDeIngredienteDoProduto)

export default router;
