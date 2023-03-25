import express from "express";
import AuxPedidosController from "../controllers/tabAuxPedidos.js";

const router = express.Router()

router
    .get("/consultaAtendentes", AuxPedidosController.consultaDeAtendentes)
    .get("/consultaEntregadores", AuxPedidosController.consultaDeEntregadores)
    .post("/cadastraAtendente", AuxPedidosController.cadastroDeAtendente)
    .post("/cadastraEntregador", AuxPedidosController.cadastroDeEntregador)
    .put("/alteraAtendente/:IdAtendente", AuxPedidosController.alteracaoDeAtendente)
    .delete("/excluiEntregador/:id", AuxPedidosController.exclusaoDeEntregador)
    .delete("/excluiAtendente/:id", AuxPedidosController.exclusaoDeAtendente)

export default router;