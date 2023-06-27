import { prisma } from "../../db/database";



class BuscarUltimoIdoResultado {
    static async getId() {
        return await prisma.game.findFirst({ select: { match_id: true }, orderBy: { match_id: "desc" }, take: 1 })
    }
}

export { BuscarUltimoIdoResultado }