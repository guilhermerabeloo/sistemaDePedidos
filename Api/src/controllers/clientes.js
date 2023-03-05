import Cliente from "../models/clientes.js";

class ClienteController {
    static listagemDeClientes = async (req, res) => {
        const clienteModel = new Cliente();

        await clienteModel
            .listaClientes(req)
            .then((resultado) => {
                res.code(200).send(resultado.toJason())
            })
            .catch((err) => {
                console.log(err)
                res.code(500).send({error: err})
            })
    }
}

export default ClienteController;