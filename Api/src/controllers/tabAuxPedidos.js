import AuxPedidos from "../models/tabAuxPedidos.js";

class AuxPedidosController {
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
}

export default AuxPedidosController;