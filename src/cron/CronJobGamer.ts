import cron from "node-cron"
import { returnLastIdTableGames } from "../utils/returnLastIdTableGames"
import { generateUniqueNumbers } from "../utils/generateUniqueNumbers"
import { insertValueTableGame } from "../utils/insertValueTableGame"
import { calculateBetMetch } from "../utils/calculateBetMetch"
import { prisma } from "../db/database"
import { UpdateValuesTableBet } from "../utils/UpdateValuesTableBet"

import axios from "axios"

let totalNumber: any = []

class CronJobGamer {
    static async startGamer(io: any) {
        return cron.schedule('3 * * * * *', async () => {
            io.emit("__CLEAN__")

            // NUMERO UNÍCO GAME
            const NEW_NAMBER_GAME = String(await this.FN_GET_NUMBER_GAME())

            // BUSCAR ULTIMO ID INSERIDO NA TABELA GAME
            const LAST_NAMBER_INSERTED_TABLE_GAME = Number(await this.FN_VERIFY_LAST_INSERT_TABLE_GAMER())

            // INSERI NO BANCO DE DADOS
            const GAMER = await insertValueTableGame(NEW_NAMBER_GAME, LAST_NAMBER_INSERTED_TABLE_GAME)
            const _ID = GAMER?.match_id
            // ENVIAR PARA O FRON-END O ID DO GAMER
            io.emit("number::aposta", _ID)

            console.log(_ID);


            const TRANSFORME_STRING_TO_ARRAY = NEW_NAMBER_GAME.split(",").map(n => Number(n))

            let _quantity_loop = 0
            const resultados: any = [];

            TRANSFORME_STRING_TO_ARRAY.forEach((n, i) => {

                setTimeout(async () => {
                    if (totalNumber.length == 6) {
                        totalNumber = []
                    } else {
                        totalNumber.push(n)
                        io.emit("gamer:total", [...totalNumber])
                        io.emit("gamer", n)
                    }
                    _quantity_loop++

                    if (_quantity_loop == 6) {
                        // CALCULAR AS APOSTAS E MOSTRAR AS APOSTAS QUE FORAM PREMIADAS
                        calculateBetMetch.verifyBetMatch(GAMER).then(async response => {
                            // const game = NEW_NAMBER_GAME.split(",").map(_R => Number(_R))

                            const BETS = await prisma.bet.findMany({ where: { number_game_result: String(GAMER?.match_id), awarded: false, status: "IN_PROCESSING" } })


                            if (BETS.length <= 0) {
                                io.emit("_GANHADORES_", { resultados: [], bet: false })
                                return false
                            }

                            let correspondencias = 0;

                            for (const _BET of BETS) {

                                for (const _RESPONSE of _BET.numbers.split(",").map(_R => Number(_R))) {
                                    if (TRANSFORME_STRING_TO_ARRAY.includes(_RESPONSE)) {
                                    console.log(_RESPONSE);                                    
                                        correspondencias++;
                                    }
                                }

                                if (correspondencias >= 1) {
                                    UpdateValuesTableBet.winners(correspondencias, _BET.id).then(items => {
                                        resultados.push({ id: _BET.id, numeros: _BET.numbers, correspondencias, aposta: items });

                                    }).finally(() => {
                                        io.emit("_GANHADORES_", { resultados, bet: true })
                                    })
                                } else {
                                    UpdateValuesTableBet.losers(_BET.id).then(r => r)
                                }                               

                            }
                        })
                    }

                }, 3000 * i)



            })


        })



    }

    private static async FN_GET_NUMBER_GAME(): Promise<any> {
        // Gerar um GAME aleatório que tenha 6 posições
        const numbersGame = await generateUniqueNumbers()
        // @ts-ignore
        const newNumbersGame = numbersGame.toString().slice(",")

        return newNumbersGame

    }

    private static async FN_VERIFY_LAST_INSERT_TABLE_GAMER(): Promise<Number> {
        // VERIFICAR NA LABELA GAMER O ULTIMO REGISTRO - CASO NÃO TENHA NENHUM O PRIMEIRO É O 1, E A PARTIR DISSO SEMPRE FAZER O INCREMENT +1
        const last = await returnLastIdTableGames()
        return last
    }



}


export { CronJobGamer }