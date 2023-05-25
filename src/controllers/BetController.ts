import { Request, Response } from "express"
import { prisma } from "../db/database";
import { generateUniqueNumbers12 } from "../utils/generateUniqueNumbers12";

class BetController {
    static async create(request: Request, response: Response) {
        const { numbers, establishmentId } = request.body;

        const game = await prisma.game.findFirst({ orderBy: { created_at: "desc" } })
        const qty = game?.match_id! ? game?.match_id! + 1 : 1

        try {

            const old_number = await prisma.bet.findFirst({ orderBy: { created_at: "desc" } })
            const number_insert = Boolean(old_number?.namber_bet) == true ? old_number?.namber_bet! + 1 : 1
            const content = await prisma.bet.create({
                data: {
                    number_game_result: String(qty),
                    numbers: String(generateUniqueNumbers12()),
                    establishmentId: establishmentId,
                    namber_bet: number_insert

                }
            })

            response.json(content)

        } catch (error) {
            // @ts-ignore
            response.json(error?.meta?.target == 'bets_namber_bet_key' ? "Tente novamente!" : error)
        }

    }
}

export { BetController }