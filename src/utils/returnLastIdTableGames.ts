import { prisma } from "../db/database";


async function returnLastIdTableGames(): Promise<Number> {
    const games = await prisma.game.findFirst({ orderBy: { created_at: "desc" } })
    let increment = 1
    if (games?.match_id == undefined) {
        increment
    } else {
        increment = games?.match_id! + 1
    }
    return increment
}

export { returnLastIdTableGames }