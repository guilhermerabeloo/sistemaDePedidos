import express from "express";
import AuxPedidosController from "../controllers/tabAuxPedidos.js";

const router = express.Router()

router
    .post("/cadastraAtendente", AuxPedidosController.cadastroDeAtendente)

export default router;