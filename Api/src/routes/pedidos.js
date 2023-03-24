import express from "express";
import PedidoController from "../controllers/pedidos.js";
import Pedido from "../models/pedidos.js";

const router = express();

router
    .get("/consultaPedido/:Id", PedidoController.consultaDePedido)
    .get("/consultaItemPedido/:Id", PedidoController.consultaDeItensPedido)
    .post("/criaPedido", PedidoController.cadastroDePedido)
    .post("/adicionaItemPedido", PedidoController.adicaoDeItemNoPedido)
    .put("/alteraPedido/:Id", PedidoController.alteracaoDePedido)
    .put("/alteraItemPedido/:IdPedido/:IdItem", PedidoController.alteracaoDeItem)
    .delete("/excluiPedido/:Id", PedidoController.exclusaoDePedido)
    .delete("/excluiItemPedido/:Id", PedidoController.exclusaoDeItemPedido)

export default router