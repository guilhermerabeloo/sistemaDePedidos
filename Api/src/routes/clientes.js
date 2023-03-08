import express from "express";
import ClienteController from "../controllers/clientes.js";

const router = express.Router()

router
    .get('/clientes', ClienteController.listagemDeClientes)
    .get('/bairros', ClienteController.listagemDeBairros)
    .post('/cadastraBairro', ClienteController.cadastroDeBairros)

export default router;
