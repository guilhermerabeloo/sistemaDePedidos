import pgPool from "../../config/pgPool.js";

function Kit(){}

Kit.prototype.listaKits = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            SELECT * FROM kits
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
                error: err,
            };
            reject(result);
        })
    })
}

Kit.prototype.consultaKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idKit = req.params.Kit
        pgPool(`
            SELECT
                k.idKit
                , k.kit
                , sk.preco
                , pk.qtde
                , p.produto
            FROM kits as k
            INNER JOIN sit_kits as sk ON sk.idKit = k.idKit AND sk.idSituacao = (SELECT MAX(sk2.idSituacao) FROM sit_kits AS sk2 WHERE sk.idKit = sk2.idKit)
            INNER JOIN produtos_kit as pk ON pk.idkit = k.idKit
            INNER JOIN produtos as p ON p.idProduto = sk.idProduto
            WHERE
                k.idKit = ${idKit}
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
                error: err,
            };
            reject(result);
        })
    })
}

Kit.prototype.cadastraKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO kits
            (kit)
            VALUES
            ($1)
        `,
        [
            req.body.Kit,
        ]
        )
        .then((res) => {
            const result = [];
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

Kit.prototype.cadastraSituacaoKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO sit_kits
            (dataSituacao, preco, idKit)
            VALUES
            ($1, $2, $3)
        `
        [
            new Date(),
            req.body.Preco,
            req.body.IdKit
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

Kit.prototype.associaProdutoKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
        INSERT INTO produtos_kit
        VALUES
        ($1, $2, $3)
        `,
        [
            req.body.IdKit,
            req.body.IdProduto,
            req.body.Qtde,
        ]
        )
        .then((res) => {
            const result = [];
            
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
            reject(result)
        })
    })
}

Kit.prototype.alteraKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idKit = req.params.IdKit;
        pgPool(`
            UPDATE kits
            SET
                kit = $1
            WHERE
                idKit = ${idKit}
        `,
        [
            req.body.Kit
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

Kit.prototype.excluiKit = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idKit = req.body.IdKit;
        pgPool(`
            DELETE FROM kits
            WHERE
                idKit = ${idKit}
        `)
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

export default Kit;