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
                console.log(result);
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

Cliente.prototype.consultarCliente = async (req, res) => {
    return new Promise((resolve, reject) => {
        const IdCliente = req.params.Id
        pgPool(`
        SELECT 
            C.idcliente 
            , C.cliente 
            , C.telefone 
            , C.endereco 
            , C.numero 
            , B.bairro 
            , C.datacadastro 
            , C.dataatualizacao 
            , C.sexo 
            , C.dtnascimento 
        FROM clientes AS C
        INNER JOIN bairros AS B ON B.idbairro  = C.idbairro
        WHERE
            C.idcliente = ${IdCliente}
        `
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
                result.msg;
                console.log(result)
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
            req.body.IdBairro,
            new Date,
            req.body.Sexo,
            req.body.DtNascimento,
        ]
        )
        .then((req) => {
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

Cliente.prototype.editarCliente = async (req, res) => {
    return new Promise((resolve, reject) => {
        const IdCliente = req.params.Id
        pgPool(`
            UPDATE clientes 
            SET 
                idcliente = $1,
                cliente = $2,
                telefone = $3,
                endereco = $4,
                numero = $5,
                idbairro = $6,
                dataatualizacao = $7,
                sexo = $8,
                dtnascimento = $9
                
            WHERE idcliente = ${IdCliente}
        `,
        [
            req.body.IdCliente,
            req.body.Cliente,
            req.body.Telefone,
            req.body.Endereco,
            req.body.Numero,
            req.body.IdBairro,
            new Date,
            req.body.Sexo,
            req.body.DtNascimento,
        ]
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = `Cliente de ID: ${IdCliente} alterado com sucesso!`;
                result.msg = true;
                console.log(result);
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

Cliente.prototype.excluirCliente = async (req, res) => {
    return new Promise((resolve, reject) => {
        const IdCliente = req.params.Id
        pgPool(`
            DELETE FROM clientes
            WHERE
                idCliente = ${IdCliente}
        `
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = `Cliente de ID ${IdCliente} excluído com sucesso`;
                result.msg = true;
                console.log(result);
                resolve(result);
            }
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro interno",
                msg: false,
                error: err,
            }
            reject(result);
        })
    })
}

Cliente.prototype.listaBairros = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `SELECT * FROM bairros`
        )
        .then((res) => {
            const result = {};
            if(res) {
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

Cliente.prototype.editarBairro = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idBairro = req.params.Id;
        const bairro = req.body.Bairro
        pgPool(`
            UPDATE bairros
            SET
                bairro = $1,
                taxaEntrega = $2
            WHERE
                idBairro = ${idBairro}
        `,
        [
            req.body.Bairro,
            req.body.TaxaEntrega,
        ]
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = `Bairro ${bairro} alterado com sucesso!`;
                result.msg = true;
                console.log(result)
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

Cliente.prototype.excluirBairro = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idBairro = req.params.Id
        pgPool(`
            DELETE FROM bairros
            WHERE
                idBairro = ${idBairro}
        `
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = `Bairro de ID ${idBairro} excluído com sucesso`;
                result.msg = true;
                console.log(result);
                resolve(result);
            }
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro interno",
                msg: false,
                error: err,
            }
        })
    })
}

export default Cliente;
