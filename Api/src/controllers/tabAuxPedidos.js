import AuxPedidos from "../models/tabAuxPedidos.js";

class AuxPedidosController {
    static cadastroDeAtendente = async (req, res) => {
        const atendentesModels = new AuxPedidos();
        
        await atendentesModels
            .cadastraAtendente(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJASON())
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }
}

export default AuxPedidosController;