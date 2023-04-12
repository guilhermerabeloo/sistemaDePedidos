import express from "express";
import KitController from "../controllers/kit.js";

const router = express.Router()

    router
        .get('/listaKit', KitController.listagemDeKits)
        .get('/consultaKit/:Kit', KitController.consultaDeKit)
        .post('/cadastraKit', KitController.cadastroDeKit)
        .post('/cadastraSituacaoKit', KitController.cadastroDeSituacoesKit)
        .post('/associaProdutoKit', KitController.associacaoProdutoKit)
        .put('/alteraKit/:IdKit', KitController.alteracaoDeKit)
        .delete('/excluiKit/:IdKit', KitController.exclusaoDeKit)
        .delete('/excluiProdutoDoKit/:IdKit/:IdProduto', KitController.exclusaoProdutoDoKit)
        
export default router;