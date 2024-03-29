import Kit from "../models/kit.js";

class KitController {
    static listagemDeKits = async(req, res) => {
        const kitModel = new Kit();

        await kitModel
            .listaKits(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(200).send(err)
            })
    }

    static consultaDeKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .consultaKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .cadastraKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeSituacoesKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .cadastraSituacaoKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static associacaoProdutoKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .associaProdutoKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static alteracaoDeKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .alteraKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static exclusaoDeKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .excluiKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static exclusaoProdutoDoKit = async (req, res) => {
        const kitModel = new Kit();

        await kitModel
            .excluiProdutoKit(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }
}

export default KitController;

