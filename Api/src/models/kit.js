import pgPool from "../../config/pgPool.js";

function Kit(){}

Kit.prototype.consultaKits = async (req, res) => {
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

export default Kit;