import pgPool from "../../config/pgPool.js";

function Cliente()

Cliente.prototype.listaClientes = async ((req, res) => {
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
})

export default Cliente;