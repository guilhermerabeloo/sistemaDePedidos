import Produto from "../models/produtos.js";

class ProdutoController {
    static listagemDeProdutos = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .listaProdutos(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static cadastroDeProdutos = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .cadastraProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }

    static cadastroDeCategorias = async (req, res) => {
        const produtoModel = new Produto()

        await produtoModel
            .cadastraCategoria(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }

    static cadastroDeSituacoesProduto = async(req, res) => {
        const produtoModel = new Produto()
    
        await produtoModel
            .cadastraSituacaoProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }

    static cadastrarIngrediente = async(req, res) => {
        const produtoModel = new Produto()
            
        await produtoModel
            .cadastraIngrediente(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })


    }

    static relacionarIngredienteProduto = async(req, res) => {
        const produtoModel = new Produto()
        
        await produtoModel
            .associaIngrediente(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJSON())
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }
}



export default ProdutoController;
