import { prisma } from "../db/database";

async function insertValueTableGame(numbers: string, match_id: number): Promise<any> {

    // VERIFICAR SE EXISTE ESSE AWARDS JÁ INICIADO.
    const awards = await prisma.award.findFirst({ where: { gamer_ref: match_id } })

    if (awards?.id) {
        return await prisma.game.create({
            data: {
                numbers,
                match_id,

            }
        })
    } else {
        return await prisma.game.findFirst({ where: { match_id: (match_id - 1) } })
    }
}

export { insertValueTableGame }