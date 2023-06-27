import { Request, Response } from "express"
import { prisma } from "../db/database";
import { generateUniqueNumbers12 } from "../utils/generateUniqueNumbers12";
import { JogosDatabase } from "../DatabaseOperation/JogosDatabase";

class BetController {
    static async create(request: Request, response: Response) {
        try {
            const { numbers, quantidade } = request.body;
            const establishmentId = request.user.Establishment[0].id;
            const quantidade_loop = parseInt(quantidade ?? 1);

            const quantidadeDeJogos: any = [];

            for (let i = 0; i < quantidade_loop; i++) {
                const content = await JogosDatabase.create(numbers, establishmentId)
                quantidadeDeJogos.push(content)
            }

            response.json({ content: quantidadeDeJogos })
        } catch (error) {
            // @ts-ignore
            response.json(error?.meta?.target == 'bets_namber_bet_key' ? "Tente novamente!" : error)
        }
    }
}


export { BetController }