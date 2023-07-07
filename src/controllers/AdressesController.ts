import {
    Request,
    Response
} from "express";
import { EnderecosDatabase } from "../DatabaseOperation/EnderecosDatabase";

class AdressesController {
    static async create(request: Request, response: Response) {

        const { cep, state, city, neighborhood, street, number, geographic_location, latitude, longitude } = request.body
        const { establishmentId } = request.params

        const content = await EnderecosDatabase.create(cep, state, city, neighborhood, street, number, geographic_location, latitude, longitude, Number(establishmentId))

        response.json(content)
    }
}

export { AdressesController }


