import { Request, Response } from "express"
import { prisma } from "../db/database";
import { generateUniqueNumbers12 } from "../utils/generateUniqueNumbers12";
import { JogosDatabase } from "../DatabaseOperation/JogosDatabase";

class BetController {
    static async create(request: Request, response: Response) {
        try {
            const { numbers, establishmentId } = request.body;
            
            const content = await JogosDatabase.create(numbers, establishmentId)

            response.json(content)
        } catch (error) {
            // @ts-ignore
            response.json(error?.meta?.target == 'bets_namber_bet_key' ? "Tente novamente!" : error)
        }
    }
}


export { BetController }