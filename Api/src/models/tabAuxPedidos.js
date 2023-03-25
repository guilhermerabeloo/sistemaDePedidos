import pgPool from "../../config/pgPool.js";

function AuxPedidos(){}

AuxPedidos.prototype.consultaAtendentes = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`SELECT * FROM atendentes`)
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
                result.msg = true;
                resolve(result);
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
        .then((res) => {
            const result = {};
            if(res) {
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

AuxPedidos.prototype.deletaAtendente = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idAtendente = req.params.id
        pgPool(`
            DELETE FROM atendentes
            WHERE
                idatendente = ${idAtendente}
        `)
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = "Cliente excluído com sucesso";
                result.msg = true;
                console.log(result)
                resolve(result);
            }
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

AuxPedidos.prototype.cadastraEntregador = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO entregadores
            (entregador, dataCadastro)
            VALUES
            ($1, $2)
        `,
        [
            req.body.Entregador,
            new Date,
        ]
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = "Entregador cadastrado com sucesso";
                result.msg = true;
                resolve(result);
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

AuxPedidos.prototype.deletaEntregador = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idEntregador = req.params.id
        pgPool(`
            DELETE FROM entregadores
            WHERE
                identregador = ${idEntregador}
        `)
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = "Entregador excluido com sucesso";
                result.msg = true;
                console.log(result);
                resolve(result);
            }
        })
        .catch((err) => {
            console.log(err);
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