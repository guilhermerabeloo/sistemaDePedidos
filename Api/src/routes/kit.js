import express from "express";
import KitController from "../controllers/kit";

const router = express.Router()

    router
        .get("/consultaKit", KitController.consultaDeKits)
        
export default router;