import { Request, Response } from "express"
import { CheckExistEmail } from "../services/CheckExistEmail"


class ResetPasswordController {

    static async handle(request: Request, response: Response) {
        const email = request.body.email
        console.log(email);

        try {
            const content = await CheckExistEmail.handle(email)
            return response.status(200).json({ content, status: true })
        } catch (error) {
            return response.json({ error, status: false })
        }
    }

    static async handleExecute(request: Request, response: Response) {
        const uuidUrl = request.params.uuid;
        const new_password = request.params.new_password;
        
        const content = await CheckExistEmail.update(String(uuidUrl), String(new_password))

        response.json(content)

    }

}




export { ResetPasswordController }