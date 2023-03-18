import express from "express";
import PedidoController from "../controllers/pedidos.js";

const router = express();

router
    .post("/criaPedido", PedidoController.cadastroDePedido)
    .post("/adicionaItemPedido", PedidoController.adicaoDeItemNoPedido)

export default router