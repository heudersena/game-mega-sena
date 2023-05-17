import { Prisma } from "@prisma/client";
import { prisma } from "../db/database";

const apostasVencedoras: any = [];

class calculateBetMetch {
    static async verifyBetMatch(game: any): Promise<any> {
        const MATCH_ID = String(game.match_id)
        const BETS = await prisma.bet.findMany({ where: { number_game_result: MATCH_ID } }) as any

        const GAME_NUMBER = game.numbers



        for (let BET of BETS) {

            let acertos = 0

            for (let i = 0; i < BET.length; i++) {
                if (BET[i].numbers.split(",") === GAME_NUMBER.split(",")[i]) {
                    acertos++;
                } else {
                    break;
                }
            }
            if (acertos === 6) {
                apostasVencedoras.push(BET);
                console.log("Você ganhou! Os números vencedores foram:", BET);
            } else {
                console.log("OPS");

            }

        }
        return []
    }
}


export { calculateBetMetch }