import express from "express";
import ClienteController from "../controllers/clientes.js";

const router = express.Router()

router
    .get('/clientes', ClienteController.listagemDeClientes)
    .get('/bairros', ClienteController.listagemDeBairros)
    .post('/cadastraCliente', ClienteController.cadastraClientes)
    .post('/cadastraBairro', ClienteController.cadastroDeBairros)
    .put('/alteraCliente/:Id', ClienteController.edicaoDeCliente)
    .put('/alteraBairro/:Id', ClienteController.edicaoDeBairro)
    .delete('/excluiCliente/:Id', ClienteController.exclusaoDeCliente)
    .delete('/excluiBairro/:Id', ClienteController.exclusaoDeBairro)
    

export default router;
