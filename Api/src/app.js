import express from "express";
import dotev from "dotenv";
import pg from "pg";

const { Pool } = pg

dotev.config()

global.pg = new Pool({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PWD,
    port: process.env.PG_PORT,
})

global.pg
    .connect((err, client, release) => {
        if(err) {
            return console.error('Error acquiring client', err.stack);
        } else {
            console.log('CONECTADO AO BANCO DE DADOS')
        }
    })


global.pg.on('acquire', (client) => {
    console.count('------Cliente novo gerado---------\n\n\n')
});
global.pg.on('error', (err, client) => {
    console.count('Erro em cliente idle')
})
global.pg.on('remove', (client) => {
    console.count('Cliente removido')
})
global.pg.on('connect', (client) => {
    console.log('-----------CONECTADO COM O PG-------------\n\n\n')
})



const app = express();
app.use(express.json());
//routes(app)

export default app;