import { Request, Response } from "express";
class HomeController {
    static async index(request: Request, response: Response) {
        return response.render("game.html")
    }
}

export { HomeController }