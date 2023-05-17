import { prisma } from "../db/database"


class UpdateValuesTableBet {
    static async winners(hits: number, id: string) {
        const content = await prisma.bet.update({ where: { id: id }, data: { awarded: true, status: "FINISHED", hits: hits }, include: { establishment: true } })
        return content
    }
    static async losers(id: string): Promise<any> {
        const content = await prisma.bet.update({ where: { id: id }, data: { status: "FINISHED" } })
        return content;
    }
}


export { UpdateValuesTableBet }