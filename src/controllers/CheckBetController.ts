
import { Request, Response } from "express"
import { prisma } from "../db/database"
import { UpdateValuesTableBet } from "../utils/UpdateValuesTableBet";

interface Aposta {
    numeros: number[];
}

interface Ganhador {
    aposta: Aposta;
    acertos: number;
}

class CheckBetController {
    static async check(request: Request, response: Response) {
        const resultados: any = [];
        // const game = request.params.numbers.split(",").map(_R => Number(_R))
        // const _id = request.params._id    
        // @ts-ignore 
        const resultadoGame: [] = request.params.numbers.split(",").map(_R => Number(_R)); // [40,43,45,46,50,51]

        const BETS = await prisma.bet.findMany()

        if (BETS.length <= 0) {
            return response.json({ resultados, ganhadores: [] })
        }



        let correspondencias = 0;
        BETS.forEach(async (items, index) => {
            for (const _RESPONSE of items.numbers.split(",").map(_R => Number(_R))) {
                // @ts-ignore
                if (resultadoGame.includes(_RESPONSE)) {
                    correspondencias++;
                }
            }

            if (correspondencias >= 4) {
                console.log(items.numbers, correspondencias);

                UpdateValuesTableBet.winners(correspondencias, items.id).then(r => {
                    resultados.push({ id: items.id, numeros: items.numbers, correspondencias, aposta: r });

                })
            } else {
                await prisma.bet.update({
                    where: { id: items.id }, data: {
                        status: "FINISHED"
                    }
                })
            }

        })

        response.json({})


    }

    static async bkp(request: Request, response: Response) {
        const apostasVencedoras: any = [];
        const game = [1, 4, 4, 48, 24, 60]

        const BETS = await prisma.bet.findMany()
        const BETS_QTY = await prisma.bet.count()



        let qtd = 0



        for (let i = 0; i < BETS.length; i++) {

            const aposta = BETS[i].numbers.split(",")

            let vencedora = true;

            for (let j = 0; j < 6; j++) {
                console.log(BETS[i][j]);

                if (Number(aposta[j]) !== game[j]) {
                    vencedora = false;
                    break;
                } else {
                    console.log(aposta);
                }
            }

            if (vencedora) {
                // console.log(`A aposta ${aposta} é vencedora!`);
            } else {
                // console.log(`A aposta ${aposta} não é vencedora.`);
            }

        }

        response.json("ok")
    }
}


export { CheckBetController }