import express from "express";
import AuxPedidosController from "../controllers/tabAuxPedidos.js";

const router = express.Router()

router
    .get("/consultaAtendentes", AuxPedidosController.consultaDeAtendentes)
    .post("/cadastraAtendente", AuxPedidosController.cadastroDeAtendente)
    .delete("/excluiAtendente/:id", AuxPedidosController.exclusaoDeAtendente)
    .post("/cadastraEntregador", AuxPedidosController.cadastroDeEntregador)
    .delete("/excluiEntregador/:id", AuxPedidosController.exclusaoDeEntregador)

export default router;