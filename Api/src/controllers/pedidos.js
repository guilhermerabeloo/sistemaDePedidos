import Pedido from "../models/pedidos.js";

class PedidoController{
    static cadastroDePedido = async (req, res) => {
        const pedidoModel = new Pedido;

        await pedidoModel
            .criaPedido(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }
}

export default PedidoController;