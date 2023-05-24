import { prisma } from "../db/database";

// updateEveryRoundOfTheResult - ATUALIZAR A CADA RODADA DO RESULTADO
class updateEveryRoundOfTheResult {
    static async _HANDLE(BETS: any, _N: number) {
        
        const _P = await BETS.map(async (o) => {
            const numbersArray = o.numbers.split(',').map(n => parseInt(n)) // CARTELAS JOGADAS
            const intersection = numbersArray.filter(n => _N == n) as []

            if (intersection.length != 0) {
                const bet = await prisma.bet.findUnique({ where: { id: o.id } })
                const qty = bet?.hits_round ? bet?.hits_round + 1 : 1

                const namberString = bet?.namber_round ? bet?.namber_round + "," + intersection.toString() : intersection.toString()

                await prisma.bet.update({
                    where: { id: o.id }, data: {
                        hits_round: qty,
                        namber_round: namberString
                    }
                })

            }

            return o
        })
        return _P;

    }

}


export { updateEveryRoundOfTheResult }