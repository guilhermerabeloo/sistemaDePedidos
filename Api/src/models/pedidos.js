import pgPool from "../../config/pgPool.js";

function Pedido() {}

Pedido.prototype.criaPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO pedidos
                (idCliente, dataPedido, idStatus, idAtendente, idEntregador, idTipo, desconto, taxaEntrega, endereco, numero, idBairro, obs)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
        [
            req.body.IdCliente,
            new Date,
            req.body.IdStatus,
            req.body.IdAtendente,
            req.body.IdEntregador,
            req.body.IdTipo,
            req.body.Desconto,
            req.body.TaxaEntrega,
            req.body.Endereco,
            req.body.Numero,
            req.body.IdBairro,
            req.body.Obs,
        ]
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = "Pedido cadastrado com sucesso!";
                result.msg = true;
                resolve(result);
                console.log(result)
            }
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro interno",
                msg: false,
                error: err,
            };
            reject(result);
        })
    })
}

export default Pedido;