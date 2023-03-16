import pgPool from "../../config/pgPool.js";

function AuxPedidos(){}

AuxPedidos.prototype.cadastraAtendente = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO atendentes
            (atendente, dataCadastro)
            VALUES
            ($1, $2)
        `,
        [
            req.body.Atendente,
            new Date,
        ]
        )
        .then((req) => {
            const result = {};

            if(req) {
                result.code = 200;
                result.msg = true;
                result.data = "Atendente cadastrado com sucesso";
                resolve(result);
            };
        })
        .catch((err) => {
            console.log(err)
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


export default AuxPedidos;