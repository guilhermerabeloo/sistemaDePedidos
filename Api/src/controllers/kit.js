import Kit from "../models/kit.js";

class KitController {
    static consultaDeKits = async(req, res) => {
        const kitModel = new Kit();

        await kitModel
            .consultaKits(req)
            .then((resultado) => {
                res.status(200).send(resultado)
            })
            .catch((err) => {
                console.log(err);
                res.status(200).send(err)
            })
    }
}

export default KitController;

