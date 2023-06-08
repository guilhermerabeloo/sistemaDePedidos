import pgPool from "../../config/pgPool.js";

function Produto() {}

function dataFormatada() {
    const date = new Date();
    const mes = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dia = date.getDate() < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1;

    const data = `${date.getFullYear()}${mes}${dia}`;

    return data
}

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

Produto.prototype.listaIngredientes = async (req) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `SELECT * FROM ingredientes`
        )
        .then((res) => {
            const result = {} 
            if(res) {
                result.code = 200;
                result.status = true;
                result.data = res.rows;
                resolve(result);
            };
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: 'Erro interno',
                msg: false,
                error: err.stack,
            };
            reject(result);
        })
    })
}

Produto.prototype.consultaProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idProduto = req.params.Id;
        pgPool(`
        SELECT 
            p.idproduto,
            p.produto,
            c.categoria,
            sp.preco
        FROM produtos p 
        INNER JOIN categorias c ON C.idcategoria = P.idcategoria 
        INNER JOIN sit_produtos sp ON sp.idproduto = p.idproduto AND sp.datasituacao = (SELECT MAX(sp2.datasituacao) FROM sit_produtos sp2 WHERE sp.idsituacao = sp2.idsituacao)
        WHERE
            P.idproduto = ${idProduto}
        `)
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
                error: err
            };
            reject(result);
        })
    })
}

Produto.prototype.consultaIngredientesProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idProduto = req.params.IdProduto;

        pgPool(`
        SELECT 
            p.idproduto 
            , p.produto 
            , i.ingrediente 
        FROM produtos p 
        LEFT JOIN ingrediente_produto ip ON ip.idproduto  = p.idproduto 
        LEFT JOIN ingredientes i ON I.idingrediente = ip.idingrediente 
        WHERE 
            P.idproduto = ${idProduto}
        `)
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
                result.msg = true;
            };
            resolve(result);
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro interno",
                msg: false,
                error: err
            };
            reject(result);
        })
    })
}

Produto.prototype.cadastraProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        const produto = req.body.Produto;
        const categoria = req.body.Categoria;
        const preco = req.body.Preco;
        const ingredientes = req.body.Ingredientes;
        let idProduto;

    // 1 - Criacao do produto
        pgPool(
            `
            INSERT INTO produtos
                (produto, idcategoria)
            VALUES
                ('${produto}', ${categoria})
            RETURNING idproduto
            `
        )
        .then((res) => {
            idProduto = res.rows[0].idproduto

            return pgPool(
                `
                INSERT INTO sit_produtos
                    (dataSituacao, preco, idProduto)
                VALUES
                    ('${dataFormatada()}', ${preco}, ${idProduto})
                `
            )
        })
        .then(() => {
            const promisesIngredientes = ingredientes.map((ingrediente) => {
                pgPool(
                    `
                    INSERT INTO ingrediente_produto
                    VALUES
                        (${idProduto}, ${ingrediente})
                    `
                )
            });
            
            return Promise.all(promisesIngredientes)
        })
        .then((res) => {
            const result = [];
            if (res) {
                result.code = 200;
                result.data = "Produto cadastrado com sucesso!"
                result.msg = true;
                resolve(result);
            };
        })
        .catch((err) => {
            console.log(err)
            const result = {
                hint: 'Erro interno',
                code: 500,
                msg: false,
                error: err,
            };
            reject(result);
        });
    });
}

Produto.prototype.alteraProduto = (req, res) => {
    return new Promise((resolve, reject) => {
        const idProduto = req.params.Id
        pgPool(`
        UPDATE produtos 
        SET 
            produto = $1,
            idcategoria = $2
        WHERE
            idproduto = ${idProduto}
        `,
        [
            req.body.Produto,
            req.body.Categoria,
        ]
        )
        .then((res) => {
            const result = {};

            if(res) {
                result.code = 200;
                result.data = res;
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

Produto.prototype.cadastraCategoria = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO categorias
                (categoria, sigla)
            VALUES
                ($1, $2)
            `,
            [
                req.body.Categoria,
                req.body.Sigla,
            ]
        )
        .then((res) => {
            const result = {};
            if (res) {
                result.code = 200;
                result.data = "Categoria cadastrada com sucesso!";
                result.msg = true;
                resolve(result);
            }
        })
        .catch((err) => {
            console.log(err);
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
                error: err,
            }
            reject(result)
        })
    })
}

Produto.prototype.cadastraSituacaoProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO sit_produtos
                (dataSituacao, preco, idProduto)
            VALUES
                (${dataFormatada()}, $2, $3)
            `
            , 
            [
                req.body.Data,
                req.body.Preco,
                req.body.IdProduto,
            ]
        )
        .then((res) => {
            const result = {};
            if (res) {
                result.code = 200;
                result.data = "Situacao Cadastrada com sucesso!";
                result.msg = true;
                resolve(result);
            }
        })
        .catch((err) => {
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
                error: err,
            }
            reject(result);
        })
    })
}

Produto.prototype.cadastraIngrediente = async(req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO ingredientes
                (ingrediente)
            VALUES
                ($1)
            `,
            [
                req.body.Ingrediente,
            ]
        )
        .then((res) => {
            const result = {};

            if (res) {
                result.code = 200;
                result.data = "Ingrediente cadastrado com sucesso!";
                result.msg = true;
                resolve(result)
            }
        })
        .catch((err) => {
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
                error: err
            };
            reject(result);
        })
    })
}

Produto.prototype.associaIngrediente = async(req, res) => {
    const idProduto = req.params.idProduto;
    const idIngrediente = req.params.idIngrediente;

    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO ingrediente_produto
            VALUES
                (${idProduto}, ${idIngrediente})
            `
        )
        .then((res) => {
            const result = {};
            if (res) {
                result.code = 200;
                result.data = "Ingrediente associado com sucesso!"
                result.msg = true;
                resolve(result)
            }
        })
        .catch((res) => {
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
            };
            reject(result);
        })
    })
}

Produto.prototype.excluiIngredienteProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idProduto = req.params.IdProduto;
        const idIngrediente = req.params.IdIngrediente;

        pgPool(`
        DELETE FROM ingrediente_produto 
        WHERE 
            idproduto = ${idProduto}
            AND idingrediente = ${idIngrediente}
        `)
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
                result.msg = true;
            };
            resolve(result);
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro Interno",
                msg: false,
                error: err,
            }
            reject(result);
        })
    })
}

export default Produto;
