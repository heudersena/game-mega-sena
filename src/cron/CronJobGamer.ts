import cron from "node-cron"
import moment from "moment"
import { returnLastIdTableGames } from "../utils/returnLastIdTableGames"
import { generateUniqueNumbers } from "../utils/generateUniqueNumbers"
import { insertValueTableGame } from "../utils/insertValueTableGame"
import { prisma } from "../db/database"

import { updateEveryRoundOfTheResult } from "../utils/updateEveryRoundOfTheResult"


class CronJobGamer {
    static async startGamer(io: any) {
        return cron.schedule('*/3 * * * *', async () => {
            io.emit("__CLEAN__")

            // NUMERO UNÍCO GAME
            const NEW_NAMBER_GAME = String(await this.FN_GET_NUMBER_GAME())

            // BUSCAR ULTIMO ID INSERIDO NA TABELA GAME
            const LAST_NAMBER_INSERTED_TABLE_GAME = Number(await this.FN_VERIFY_LAST_INSERT_TABLE_GAMER())

            // INSERI NO BANCO DE DADOS
            const GAMER = await insertValueTableGame(NEW_NAMBER_GAME, LAST_NAMBER_INSERTED_TABLE_GAME)
            const _ID = String(GAMER?.match_id)

            const convertyNumber = Number(GAMER?.match_id) - 1

            console.log("GAMER: ", GAMER);

            // BUSCAR VALORES DO ULTIMO CONCURSO
            const awars = await prisma.award.findFirst({ orderBy: { created_at: "desc" }, where: { ref_id: convertyNumber } })


            const awarsOld: number = Number(awars?.subtract_premiums) ? Number(awars?.subtract_premiums) : 50.01
            await prisma.award.create({
                data: {
                    total_prizes: awarsOld,
                    subtract_premiums: awarsOld,
                    seine: (awarsOld * 75) / 100,
                    corner: (awarsOld * 15) / 100,
                    block: (awarsOld * 10) / 100,
                    ref_id: Number(_ID),
                    gameId: GAMER?.id
                }
            })

            // SALVAR O VALOR DO CONCURSO



            const hours_database = GAMER?.created_at
            const hora_database = moment(hours_database).format("HH:mm:ss")
            const horaAtualida = moment(hours_database).add(2, 'minutes').format("HH:mm:ss")


            io.emit("relogio", {
                atual: hora_database,
                atualizda: horaAtualida
            })

            // ENVIAR PARA O FRON-END O ID DO GAMER
            io.emit("number::aposta", _ID)

            const TRANSFORME_STRING_TO_ARRAY = NEW_NAMBER_GAME.split(",").map(n => Number(n))

            const BETS = await prisma.bet.findMany({ where: { awarded: false, number_game_result: _ID, status: "IN_PROCESSING" } })

            processArray(0)

            async function processArray(index) {
                let countTimeOut;
                if (index >= TRANSFORME_STRING_TO_ARRAY.length) {
                    console.log("TRANSFORME_STRING_TO_ARRAY:", TRANSFORME_STRING_TO_ARRAY.length);

                    // 15
                    const betContent = await prisma.bet.findMany({ where: { awarded: false, number_game_result: _ID, hits: { gte: 4 } } })
                    console.log(betContent);

                    // ALGUMA LOGICA....
                    clearTimeout(countTimeOut)
                    calculaApostas()
                    return;
                }

                countTimeOut = setTimeout(async () => {
                    io.emit("gamer:total", TRANSFORME_STRING_TO_ARRAY[index])
                    processArray(index + 1);
                }, 10000);

                // CALCULAR AS MELHORES CARTELAS
                await updateEveryRoundOfTheResult._HANDLE(BETS, TRANSFORME_STRING_TO_ARRAY[index])
                // const updateBetView = await prisma.bet.findMany({ where: { number_game_result: _ID, AND: { hits: { gt: 3 } } }, orderBy: { hits_round: "desc" }, include: { establishment: true } })

                const updateBetView = await prisma.bet.findMany({ where: { number_game_result: String(_ID), AND: {} }, take: 15, orderBy: { hits_round: "desc" }, include: { establishment: { select: { name: true } } } })

                if (updateBetView.length > 0) {
                    console.log("Entrar");
                    const newListMap = updateBetView.map(i => {
                        return {
                            id: i.id,
                            namber_bet: i.namber_bet,
                            name: i.establishment.name,
                            namber_round: i.namber_round ? i.namber_round!.split(",") : []
                        }
                    })
                    setTimeout(() => io.emit("_GANHADORES_", { _GANHADORES_: newListMap, info: false }), 1000)
                    console.log("Sair");
                }
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

                setTimeout(() =>
                    prisma.bet.findMany({ where: { number_game_result: { equals: String(_ID) }, AND: { awarded: { equals: true } } }, take: 15, include: { establishment: { select: { name: true } } } })
                        .then((comments) => {
                            if (comments.length > 0) {
                                const newListMap = comments.map(i => {
                                    return {
                                        id: i.id,
                                        namber_bet: i.namber_bet,
                                        name: i.establishment.name,
                                        namber_round: i.namber_round ? i.namber_round!.split(",") : []
                                    }
                                })
                                console.log("setTimeout init", new Date().toTimeString());
                                io.emit("_GANHADORES_", { _GANHADORES_: newListMap, info: true })
                                console.log("setTimeout fim", new Date().toTimeString());

                            }
                        })

                    , 2000)

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