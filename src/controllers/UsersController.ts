import { Request, Response } from "express";
import { UsuariosDatabase } from "../DatabaseOperation/UsuariosDatabase";

class UsersController {
    static async CreateNewUser(request: Request, respose: Response) {
        const { email, password, access_role } = request.body;
        const content = await UsuariosDatabase.register(email, password, access_role)
        return respose.json(content)
    }


    static async Login(request: Request, respose: Response) {
        const { email, password } = request.body;
        const content = await UsuariosDatabase.login(email, password)
        return respose.json(content)
    }

    static async recover_password(request: Request, respose: Response) {
        const { email } = request.body;
        const content = await UsuariosDatabase.recovery_password(email)
        return respose.json(content)
    }

    static async update_recover_password(request: Request, respose: Response) {
        const { uuid } = request.params;
        const { new_password } = request.body
        const content = await UsuariosDatabase.update_password(uuid, new_password)
        return respose.json(content)
    }
}

export { UsersController }