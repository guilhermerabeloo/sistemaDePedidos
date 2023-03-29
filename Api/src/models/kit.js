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

export default Kit;