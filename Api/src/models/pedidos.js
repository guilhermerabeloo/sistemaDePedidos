import pgPool from "../../config/pgPool.js";

function Pedido() {}

Pedido.prototype.consultaPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idPedido = req.params.Id;
        pgPool(
            `
            SELECT 
                p.idpedido 
                , c.cliente 
                , p.datapedido 
                , s.status 
                , a.atendente 
                , e.entregador 
                , t.tipo 
                , p.desconto 
                , P.taxaentrega 
                , p.endereco 
                , p.numero 
                , b.bairro 
                , p.obs 
            FROM pedidos p 
            INNER JOIN clientes c ON c.idcliente = p.idpedido 
            INNER JOIN statuspedido s ON s.idstatus = p.idstatus 
            INNER JOIN atendentes a ON a.idatendente = p.idatendente 
            INNER JOIN entregadores e ON E.identregador  = P.identregador 
            INNER JOIN tipospedido t ON t.idtipo = p.idtipo
            INNER JOIN bairros b ON b.idbairro = p.idbairro 

            WHERE
                p.idpedido = ${idPedido}
            `
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
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

Pedido.prototype.consultaItemPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idPedido = req.params.Id
        pgPool(
            `
            SELECT 
                ip.iditem 
                , ip.idpedido 
                , p.produto 
                , k.kit 
                , ip.qtde 
                , ip.valorunitario 
                , ip.valortotal 
                , ip.obs
            FROM item_pedido ip 
            LEFT JOIN produtos p ON p.idproduto = ip.idproduto 
            LEFT JOIN kits k ON k.idkit = ip.idkit 
            WHERE
                ip.idpedido = ${idPedido}
            `
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res.rows;
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

Pedido.prototype.alteraPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idPedido = req.params.Id;
        pgPool(
            `
            UPDATE pedidos 
            SET
                idstatus = $1,
                identregador = $2,
                idtipo = $3,
                desconto = $4,
                taxaentrega = $5,
                endereco = $6,
                numero = $7,
                idbairro = $8,
                obs = $9
            WHERE 
                idpedido = ${idPedido}
            `,
            [
                req.body.Status,
                req.body.Entregador,
                req.body.Tipo,
                req.body.Desconto,
                req.body.TaxaEntrega,
                req.body.Endereco,
                req.body.Numero,
                req.body.Bairro,
                req.body.Obs,
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
            console.log(result);
            resolve(result);
        })
        .catch((err) => {
            const result = {
                code: 500,
                hint: "Erro Interno",
                msg: false,
                error: err,
            };
            reject(result)
        })
    })
}

Pedido.prototype.alteraItemPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idPedido = req.params.IdPedido;
        const idItem = req.params.IdItem;
        pgPool(`
        UPDATE item_pedido 
        SET
            idproduto = $1,
            idkit = $2,
            qtde = $3,
            valortotal = $4,
            obs = $5
            
        WHERE
            idpedido = ${idPedido}
            AND iditem = ${idItem}
        `,
        [
            req.body.Produto,
            req.body.Kit || null,
            req.body.Qtde || null,
            req.body.ValorTotal,
            req.body.Obs,
        ]
        )
        .then((res) => {
            const result = {};
            if(res) {
                result.code = 200;
                result.data = res;
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

Pedido.prototype.criaPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO pedidos
                (idCliente, dataPedido, idStatus, idAtendente, idEntregador, idTipo, desconto, taxaEntrega, endereco, numero, idBairro, obs)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
        [
            req.body.IdCliente,
            new Date,
            req.body.IdStatus,
            req.body.IdAtendente,
            req.body.IdEntregador,
            req.body.IdTipo,
            req.body.Desconto,
            req.body.TaxaEntrega,
            req.body.Endereco,
            req.body.Numero,
            req.body.IdBairro,
            req.body.Obs,
        ]
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = "Pedido cadastrado com sucesso!";
                result.msg = true;
                resolve(result);
                console.log(result)
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

Pedido.prototype.excluiPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idPedido = req.params.Id
        pgPool(`
            DELETE FROM pedidos
            WHERE
                idPedido = ${idPedido}
        `
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = `Pedido ${idPedido} excluído com sucesso`;
                result.msg = true;
                console.log(result);
                resolve(result);
            };
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

Pedido.prototype.cadastraItemPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        pgPool(`
            INSERT INTO item_pedido
            (idPedido, idProduto, idKit, qtde, valorUnitario, valorTotal, obs)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
            req.body.IdPedido,
            req.body.IdProduto || null,
            req.body.IdKit || null,
            req.body.Quantidade,
            req.body.ValorUnitario,
            req.body.ValorTotal,
            req.body.Observacao,
        ]
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = "Item adicionado ao pedido";
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

Pedido.prototype.excluiItemPedido = async (req, res) => {
    return new Promise((resolve, reject) => {
        const idItem = req.params.Id;
        pgPool(`
            DELETE FROM item_pedido
            WHERE
                idItem = ${idItem}
        `
        )
        .then((res) => {
            const result = {}
            if(res) {
                result.code = 200;
                result.data = `Item ${idItem} excluído com sucesso`;
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

export default Pedido;