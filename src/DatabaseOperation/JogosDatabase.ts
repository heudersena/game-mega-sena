import { prisma } from "../db/database"
import { generateUniqueNumbers12 } from "../utils/generateUniqueNumbers12"
import { SUCCESS } from "../utils/message"

class JogosDatabase {

    static async create(numeros: string, establishmentId: string) {

        try {
            const game = await prisma.game.findFirst({ orderBy: { created_at: "desc" } })
            const qty = game?.match_id! ? game?.match_id! + 1 : 1
            const old_number = await prisma.bet.findFirst({ orderBy: { created_at: "desc" } })
            const number_insert = Boolean(old_number?.namber_bet) == true ? old_number?.namber_bet! + 1 : 1

            const numbers = String(numeros ? numeros : generateUniqueNumbers12())

            const content = await this._FN_LOCAL_CREATE_BET(qty, numbers, establishmentId, number_insert)
            return { status: false, message: SUCCESS, data: content }
        } catch (error) {
            return { status: true, message: error, data: [] }
        }


    }


    static async _FN_LOCAL_CREATE_BET(number_game_result: number, numbers: string, establishmentId: string, namber_bet: number) {
        try {
            const content = await prisma.bet.create({
                data: {
                    number_game_result: String(number_game_result),
                    numbers: String(numbers),
                    establishmentId: establishmentId,
                    namber_bet: namber_bet

                }
            })

            return content
        } catch (error) {
            return error
        }
    }

}


export { JogosDatabase }