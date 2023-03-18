import Cliente from "../models/clientes.js";

class ClienteController {
    static listagemDeClientes = async (req, res) => {
        const clienteModel = new Cliente();

        await clienteModel
            .listaClientes(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJason())
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static cadastraClientes = async (req, res) => {
        const clienteModel = new Cliente();

        await clienteModel
            .cadastraCliente(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static edicaoDeCliente = async (req, res) => {
        const clienteModel = new Cliente;

        await clienteModel
            .editarCliente(req)
            .then((resultado) => {
                res.status(200).send(resultado);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }

    static listagemDeBairros = async (req, res) => {
        const clienteModel = new Cliente();

        await clienteModel
            .listaBairros(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err)
            })
    }

    static cadastroDeBairros = async (req, res) => {
        const clienteModel = new Cliente();

        await clienteModel
            .cadastraBairro(req)
            .then((resultado) => {
                res.status(200).send(resultado.toJASON())
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }

    static edicaoDeBairro = async (req, res) => {
        const bairroModel = new Cliente;

        await bairroModel
            .editarBairro(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
    }
}

export default ClienteController;
