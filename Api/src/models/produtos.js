import pgPool from "../../config/pgPool.js"

function Produto() {}

Produto.prototype.listaProdutos = async (req) => {
    return new Promise((resolve, reject) => {
        pgPool(
            'SELECT * FROM produtos'
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

Produto.prototype.cadastraProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO produtos
                (produto, idcategoria)
            VALUES
                ($1, $2)
            `,
            [
                req.body.produto,
                req.body.idcategoria,
            ]
        )
            .then((res) => {
                const result = [];
                if (res) {
                    result.code = 200;
                    result.data = "Produto cadastrado com sucesso!"
                    result.msg = true;
                    resolve(result);
                }
            })
            .catch((err) => {
                console.log(err)
                const result = {
                    hint: 'Erro interno',
                    code: 200,
                    msg: false,
                    error: err,
                }
                reject(result)
            })
    })
}

export default Produto;
