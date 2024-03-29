import AuxPedidos from "../models/tabAuxPedidos.js";

class AuxPedidosController {
    static consultaDeAtendentes = async (req, res) => {
        const atendenteModel = new AuxPedidos();

        await atendenteModel
            .consultaAtendentes(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static consultaDeEntregadores = async (req, res) => {
        const entregadorModel = new AuxPedidos();

        await entregadorModel
            .consultaEntregadores(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeAtendente = async (req, res) => {
        const atendentesModels = new AuxPedidos();
        
        await atendentesModels
            .cadastraAtendente(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static consultaDeTiposPedido = async (req, res) => {
        const tipoPedidoModel = new AuxPedidos();

        await tipoPedidoModel
            .consultaTiposPedido(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static consultaDeStatusPedido = async (req, res) => {
        const statusPedidoModel = new AuxPedidos();

        await statusPedidoModel
            .consultaStatusPedido(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeEntregador = async (req, res) => {
        const entregadorModel = new AuxPedidos();

        await entregadorModel
            .cadastraEntregador(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static alteracaoDeAtendente = async (req, res) => {
        const atendenteModel = new AuxPedidos();

        await atendenteModel
            .alteraAtendente(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err);
            })
    }

    static alteracaoDeEntregador = async (req, res) => {
        const entregadorModel = new AuxPedidos();

        await entregadorModel
            .alteraEntregador(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static exclusaoDeAtendente = async (req, res) => {
        const atendenteModel = new AuxPedidos();

        await atendenteModel
            .deletaAtendente(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static exclusaoDeEntregador = async (req, res) => {
        const entregadorModel = new AuxPedidos();

        await entregadorModel
            .deletaEntregador(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }
}

export default AuxPedidosController;