import { Request, Response } from "express";
import { UsuariosCRUDDatabase } from "../services/UsuariosCRUDDatabase";

class UsersController {
    static async CreateNewUser(request: Request, respose: Response) {
        const { email, password } = request.body;
        const content = await UsuariosCRUDDatabase.CreateNewUser(email, password)
        respose.json(content)
    }
}

export { UsersController }