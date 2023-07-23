import pgPool from "../../config/pgPool.js";

function Produto() {}

function dataFormatada() {
    const date = new Date();
    const mes = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dia = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();

    const data = `${date.getFullYear()}${mes}${dia}`;

    return data
}

Produto.prototype.listaProdutos = async (req) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            SELECT 
                p.idproduto,
                p.produto,
                p.idcategoria,
                c.categoria,
                c.sigla,
                sp.preco 
            FROM produtos p
            LEFT JOIN sit_produtos sp ON sp.idproduto = p.idproduto AND sp.idsituacao  = (SELECT MAX(sp2.idsituacao) FROM sit_produtos sp2 WHERE sp.idproduto  = sp2.idproduto)
            LEFT JOIN categorias c ON p.idcategoria = c.idcategoria 
            ORDER BY p.produto
            `
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
            const result = {
                hint: 'Erro interno',
                code: 500,
                msg: false,
                error: err,
            };
            console.log(err)
            reject(result)
        })
        })
    }

Produto.prototype.listaCategorias = async (req) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            SELECT * FROM categorias
        `)
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.msg = true;
                result.data = res.rows;
            };

            resolve(result);
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: 'Erro interno',
                msg: false,
                error: err,
            };

            reject(result);
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

Produto.prototype.listaAdicionais = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `SELECT * FROM adicionaisItens`
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.msg = true;
                result.data = res.rows;

                resolve(result);
            }
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: 'Erro interno',
                msg: false,
                error: err.stack,
            };

            console.log(err);
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
            , i.idingrediente
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
    // 2- Criando a situacao do produto
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
    // 3 - Cadastrando os ingredientes do produto
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
        const idProduto = req.params.Id;

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
            };
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro interno",
                msg: false,
                error: err,
            };
            console.log(err)
            reject(result);
        });
    });
};

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
            const result = {
                hint: "Erro interno",
                code: 500,
                msg: false,
                error: err,
            }
            console.log(err);
            reject(result);
        })
    })
}

Produto.prototype.cadastraSituacaoProduto = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(
            `
            INSERT INTO sit_produtos
                (dataSituacao, preco, idproduto)
            VALUES
                ('${dataFormatada()}', $1, $2)
            `
            , 
            [
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
    const idIngredientes = req.body.Ingredientes;
    return new Promise((resolve, reject) => {
        const promisesIngredientes = idIngredientes.map((ingrediente) => {
            return pgPool(
                `
                INSERT INTO ingrediente_produto
                VALUES
                    (${idProduto}, ${ingrediente})
                `
            )
        })

        return Promise.all(promisesIngredientes)
        .then((res) => {
            const result = {};
            if (res) {
                result.code = 200;
                result.data = "Ingrediente associado com sucesso!"
                result.msg = true;
                resolve(result)
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

Produto.prototype.excluiProduto = async (req) => {
    const idProduto = req.params.IdProduto;
    return new Promise((resolve, reject) => {

        const deleteIngredientes = () => {
            return new Promise((resolve, reject) => {
                pgPool(
                `
                    DELETE FROM ingrediente_produto
                    WHERE
                        idproduto = ${idProduto}
                `)
                .then(() => resolve())
                .catch((err) => reject(err));
            });
        };

        const deleteSituacao = () => {
            return new Promise((resolve, reject) => {
                pgPool(`
                    DELETE FROM sit_produtos
                    WHERE
                        idproduto = ${idProduto}
                `)
                .then(() => resolve())
                .catch((err) => reject(err));
            });
        };

        const deleteProduto = () => {
            return new Promise((resolve, reject) => {
                pgPool(`
                    DELETE FROM produtos
                    WHERE
                        idproduto = ${idProduto}
                `)
                .then(() => resolve())
                .catch((err) => reject(err));
            });
        };

        Promise.all([deleteIngredientes(), deleteSituacao(), deleteProduto()])
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.msg = true;
                result.data = res;
            }; 

            resolve(result);
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: 'Erro interno',
                msg: false,
                error: err,
            };

            reject(result);
        })
    })
}

Produto.prototype.excluiIngredienteProduto = async (req, res) => {
    const idProduto = req.params.IdProduto;
    const idIngredientes = req.body.Ingredientes;

    return new Promise((resolve, reject) => {
        const promisesIngredientes = idIngredientes.map((ingrediente) => {
            return pgPool(`
                DELETE FROM ingrediente_produto 
                WHERE 
                    idproduto = ${idProduto}
                    AND idingrediente = ${ingrediente}
            `)

        })
        return Promise.all(promisesIngredientes)
        
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
