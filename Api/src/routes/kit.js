import express from "express";
import KitController from "../controllers/kit";

const router = express.Router()

    router
        .get('/listaKit', KitController.listagemDeKits)
        .get('/consultaKit', KitController.consultaDeKit)
        
export default router;