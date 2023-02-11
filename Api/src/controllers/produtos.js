import Produto from "../models/produtos.js";

class ProdutoController {
    static listagemController = async (req, res) => {
        const newsModel = new Produto();

        await newsModel
            .listagem(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }
}

export default ProdutoController;

/*
const listagemController = async (req, res) => {
    const newsModel = new Produto();

    await newsModel
        .listagem(req)
        .then((resultado) => {
            res.status(200).send(resultado);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
};

export default listagemController;
*/