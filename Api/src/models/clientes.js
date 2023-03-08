import pgPool from "../../config/pgPool.js";

function Cliente() {}

Cliente.prototype.listaClientes = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            'SELECT * FROM clientes'
        )
        .then((res) => {
            const result = {};
            if (res) {
                result.code = 200;
                result.data = res.rows;
                result.msg = true;
                resolve(result);
            }
        })
        .catch((err) => {
            console.log(err)
            const result = {
                hint: 'Erro interno',
                code: 500,
                msg: false,
                error: err,
            };
            reject(result)
        })
    })
}

Cliente.prototype.listaBairros = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `SELECT * FROM bairros`
        )
        .then((req) => {
            const result = {};
            if(req) {
                result.code = 200;
                result.data = req.rows;
                result.msg = true;
                resolve(result)
            };
        })
        .catch((req) => {
            const result = {
                hint: "Erro interno",
                code: 200,
                msg: false,
                error: err,
            };
            reject(result);
        })
    })
}

export default Cliente;
