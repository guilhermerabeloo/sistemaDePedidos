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

    static listagemDeCategorias = async (req, res) => {
        const categoriaModel = new Produto();

        await categoriaModel
            .listaCategorias(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static listagemDeIngredientes = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .listaIngredientes(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static listagemDeAdicionais = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .listaAdicionais(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static listagemDeBordas = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .listaBordas(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static consultaDeProduto = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .consultaProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static consultaDeIngredientesProduto = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .consultaIngredientesProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeProdutos = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .cadastraProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }

    static alteracaoDeProduto = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .alteraProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeCategorias = async (req, res) => {
        const produtoModel = new Produto()

        await produtoModel
            .cadastraCategoria(req)
            .then((resultado) => {
                res.status(200).send(resultado)
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
                res.status(200).send(resultado)
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
                res.status(200).send(resultado)
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
                res.status(200).send(resultado)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }

    static exclusaoDeProduto = async (req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .excluiProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            });
    }

    static exclusaoDeIngredienteDoProduto = async(req, res) => {
        const produtoModel = new Produto();

        await produtoModel
            .excluiIngredienteProduto(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }
}



export default ProdutoController;
