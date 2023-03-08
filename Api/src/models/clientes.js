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

Cliente.prototype.cadastraCliente = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO clientes
            (cliente, telefone, endereco, numero, idBairro, dataCadastro, sexo, dtNascimento)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
            req.body.Cliente,
            req.body.Telefone,
            req.body.Endereco,
            req.body.Numero,
            req.body.idBairro,
            req.body.DataCadastro,
            req.body.Sexo,
            req.body.dtNascimento,
        ]
        )
        .then((req, res) => {
            const result = {};

            if(req) {
                result.code = 200;
                result.data = req.rows;
                result.msg = true;
                resolve(result)
            }
        })
        .catch((err) => {
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
            };
            reject(result);
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

Cliente.prototype.cadastraBairro = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO bairros
            (bairro, taxaEntrega)
            VALUES
            ($1, $2)
            `,
            [
                req.body.Bairro,
                req.body.TaxaEntrega
            ]
        )
        .then((req, res) => {
            const result = {}
            if(req) {
                result.code = 200;
                result.data = req.rows;
                result.msg = true;
                resolve(result)
            }
        })
        .catch((err) => {
            const result = {
                hitn: "Erro interno",
                code: 200,
                msg: false,
                error: err,
            }
            reject(result)
        })
    })
}

export default Cliente;
