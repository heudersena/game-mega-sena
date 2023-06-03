import { Request, Response } from "express";
import { EstabalecimentosDatabase } from "../DatabaseOperation/EstabalecimentosDatabase";


class EstablishmentController {

    static async create(request: Request, response: Response) {
        const seller_code = request.user.code_ref_user
        const { name, userId, number_phone, number_code, description } = request.body
        
        const content = await EstabalecimentosDatabase.create(userId, name, number_phone, number_code, seller_code, description)
        response.json(content)
    }

}


export { EstablishmentController }