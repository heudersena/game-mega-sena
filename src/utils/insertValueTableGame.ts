import { prisma } from "../db/database";

async function insertValueTableGame(numbers: string, match_id: number) {
    return await prisma.game.create({
        data: {
            numbers,
            match_id,
    
        }
    })
}

export { insertValueTableGame }