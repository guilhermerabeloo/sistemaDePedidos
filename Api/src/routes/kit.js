import express from "express";
import KitController from "../controllers/kit";

const router = express.Router()

    router
        .get('/listaKit', KitController.listagemDeKits)
        .get('/consultaKit/:Kit', KitController.consultaDeKit)
        .post('/cadastraKit', KitController.cadastroDeKit)
        .post('/cadastraSituacaoProduto', KitController.cadastroDeSituacoesKit)
        .post('/associaProdutoKit', KitController.associacaoProdutoKit)
        
export default router;