export default listagem = async (application, req, res) => {
    const newsModel = new application.src.models.listagem();

    await newsModel
        .listagem(req)
        .then((resultado) => {
            res.status(resultado.code).send(resultado);
        })
        .catch((err) => {
            console.log(err);
            res.status(err.code).send(err);
        })
};