import pg from "pg";
import dotenv from 'dotenv';

const { Pool } = pg

const env = dotenv.config().parsed;

const dbConfig = {
    host: env.PG_HOST,
    database: env.PG_DATABASE,
    user: env.PG_USER,
    password: env.PG_PWD,
    port: env.PG_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
};

const pool = new Pool(dbConfig);

pool.on('acquire', (client) => {
    console.count('-----Cliente novo gerado-------')
})
pool.on('error', (err, client) => {
    console.count('Erro com cliente idle')
})
pool.on("remove", (client) => {
    console.count('Cliente removido');
})
pool.on('connect', (client) => {
    console.log('-----------------CONECTADO AO PG-------------------')
})


async function pgPool(sqlQuery, values) {
    return new Promise((resolve, reject) => {
        pool
            .connect()
            .then((client) => {
                if (values) {
                    client
                        .query(sqlQuery, values)
                        .then((e) => {
                            resolve(e);
                        })
                        .catch((e) => {
                            reject(e);
                        })
                        .finally(() => {
                            console.log("Passei aqui");
                            client.release();
                        })
                } else {
                    client
                        .query(sqlQuery)
                        .then((e) => {
                            resolve(e);
                        })
                        .catch((e) => {
                            reject(e);
                        })
                        .finally(() => {
                            console.log("Passei aqui");
                            client.release();
                        })
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

export default pgPool;