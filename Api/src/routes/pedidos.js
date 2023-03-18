import express from "express";
import PedidoController from "../controllers/pedidos.js";

const router = express();

router
    .post("/criaPedido", PedidoController.cadastroDePedido)

export default router