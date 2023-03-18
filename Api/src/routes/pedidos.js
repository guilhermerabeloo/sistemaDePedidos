import express from "express";
import PedidoController from "../controllers/pedidos.js";

const router = express();

router
    .post("/criaPedido", PedidoController.cadastroDePedido)
    .post("/adicionaItemPedido", PedidoController.adicaoDeItemNoPedido)
    .delete("/excluiPedido/:Id", PedidoController.exclusaoDePedido)

export default router