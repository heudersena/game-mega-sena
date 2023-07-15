import cron from "node-cron"
import moment from "moment"
import { returnLastIdTableGames } from "../utils/returnLastIdTableGames"
import { generateUniqueNumbers } from "../utils/generateUniqueNumbers"
import { insertValueTableGame } from "../utils/insertValueTableGame"
import { prisma } from "../db/database"

import { updateEveryRoundOfTheResult } from "../utils/updateEveryRoundOfTheResult"
import { BuscarUltimoValorPremio } from "../utils/socket/BuscarUltimoValorPremio"


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

            // ATUALIZAR A TABELA AWARDS PARA NÃO RECEBER MAIS VALORES
            await prisma.award.update({ where: { id: Number(_ID) }, data: { is_completed: "REFUSES_VALUES" } }).then(i => {
                console.log("UPDATE: ", i);
            })

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

                    // console.log("TRANSFORME_STRING_TO_ARRAY:", TRANSFORME_STRING_TO_ARRAY.length);
                    clearTimeout(countTimeOut)
                    await calculaApostas()

                    try {
                        new Promise(async function (resolve, reject) {
                            const procedure = await prisma.$queryRaw`CALL PROCEDURE_BUSCAS_QUANTIDADE_GANHADORES(${_ID})`
                            await prisma.$disconnect()
                            resolve(procedure)
                        }).then(() => {

                            setTimeout(async () => {
                                const award = await prisma.award.findFirst({ where: { gamer_ref: Number(_ID) }, orderBy: { created_at: "desc" } })
                                let totalValues = Number(award?.subtract_premiums)
                                const valuesFinal = (totalValues > 0 ? totalValues : 50.00).toFixed(2)
                                const values = Number(award?.subtract_premiums) != 0 ? Number(award?.subtract_premiums) : Number(50.00)
                                try {
                                    const insert = await prisma.award.create({
                                        data: {
                                            total_prizes: valuesFinal,
                                            subtract_premiums: valuesFinal,
                                            seine: (Number(valuesFinal) * 75) / 100,
                                            corner: (Number(valuesFinal) * 15) / 100,
                                            block: (Number(valuesFinal) * 10) / 100,
                                            gamer_ref: award?.gamer_ref! + 1,
                                            is_completed: "IN_PROCESSING",
                                            home_deposit: values
                                        }
                                    })
                                    console.log("INSERT: ", insert);

                                    const awartValuesUpdate = await BuscarUltimoValorPremio.buscarValoresDosPremios()
                                    io.emit("/BUSCAR_VALORES_APOSTA", {
                                        subtract_premiums: awartValuesUpdate?.subtract_premiums,
                                        seine: awartValuesUpdate?.seine,
                                        corner: awartValuesUpdate?.corner,
                                        block: awartValuesUpdate?.block
                                    })

                                } catch (error) {
                                    console.log(error);

                                }
                                console.log("CALCULO REALIZADO!");
                            }, 10000)
                        })
                    } catch (error) {
                        console.log(error);
                    }

                    // ALGUMA LOGICA....

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
                    prisma.bet.findMany({ where: { number_game_result: { equals: String(_ID) }, AND: { awarded: { equals: true } } }, take: 15, orderBy: { hits: "desc" }, include: { establishment: { select: { name: true } } } })
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