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
        return cron.schedule('*/30 * * * * *', async () => {
            io.emit("__CLEAN__")
            console.log("SCHEDULE");

            // NUMERO UNÍCO GAME
            const NEW_NAMBER_GAME = String(await this.FN_GET_NUMBER_GAME())

            // BUSCAR ULTIMO ID INSERIDO NA TABELA GAME
            const LAST_NAMBER_INSERTED_TABLE_GAME = Number(await this.FN_VERIFY_LAST_INSERT_TABLE_GAMER())

            // INSERI NO BANCO DE DADOS
            const GAMER = await insertValueTableGame(NEW_NAMBER_GAME, LAST_NAMBER_INSERTED_TABLE_GAME)
            const _ID = GAMER?.match_id
            // ENVIAR PARA O FRON-END O ID DO GAMER
            io.emit("number::aposta", _ID)

            const TRANSFORME_STRING_TO_ARRAY = NEW_NAMBER_GAME.split(",").map(n => Number(n))
            // number_game_result: String(GAMER?.match_id)
            const BETS = await prisma.bet.findMany({ where: { awarded: false, status: "IN_PROCESSING" } })

            processArray(0)

            function processArray(index) {
                let countTimeOut;
                if (index >= TRANSFORME_STRING_TO_ARRAY.length) {
                    clearTimeout(countTimeOut)
                    calculaApostas()
                    console.log("CLEARTIMEOUT");
                    return;
                }

                countTimeOut = setTimeout(() => {
                    console.log(new Date().toTimeString());
                    console.log(TRANSFORME_STRING_TO_ARRAY[index]);
                    io.emit("gamer:total", TRANSFORME_STRING_TO_ARRAY[index])
                    processArray(index + 1);
                }, 3000);


            }

            async function calculaApostas() {
                const content = BETS.map((o) => {
                    const numbersArray = o.numbers.split(',').map(n => parseInt(n))
                    const intersection = numbersArray.filter(n => TRANSFORME_STRING_TO_ARRAY.includes(n))
                    return {
                        ...o,
                        hits: intersection.length,
                        awarded: intersection.length >= 4 ? true : false,
                        numbersArray,
                        intersection
                    }
                })

                content.forEach(async (item, index) => {
                    await prisma.bet.update({
                        where: { id: item.id }, data: {
                            hits: item.hits,
                            awarded: Boolean(item.awarded),
                            status: "FINISHED"
                        }
                    })
                })

                const comments = await prisma.bet.findMany({ where: { number_game_result: String(_ID), awarded: true }, include: { establishment: { select: { name: true } } } })

                if (comments.length > 0) {
                    io.emit("_GANHADORES_", comments)
                }


            }

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