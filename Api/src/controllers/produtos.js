import Produto from "../models/produtos.js";

class ProdutoController {
    static listagemDeProdutos = async (req, res) => {
        const newsModel = new Produto();

        await newsModel
            .listaProdutos(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON());
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static cadastroDeProdutos = async (req, res) => {
        const newsModel = new Produto();

        await newsModel
            .cadastraProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }
}

export default ProdutoController;
