import { prisma } from "../../db/database"



class BuscarUltimoValorPremio {
    static async buscarValoresDosPremios() {
        const returns = await prisma.award.findFirst({ select: { subtract_premiums: true, seine: true, corner: true, block: true }, orderBy: { created_at: "desc" }, take: 1 })
        return returns

    }
}


export { BuscarUltimoValorPremio }