import express  from "express";
import produtos from "./produtos.js";
import clientes from "./clientes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Pagina inicial'})
    })

    app.use(
        express.json(),
        produtos,
        clientes
    )
}

export default routes;