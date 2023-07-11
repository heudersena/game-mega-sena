import { prisma } from "../db/database";

class StartTableAward {


    static async starting() {
        const awars = await prisma.award.findFirst({ orderBy: { created_at: "desc" } })

        const RefUpdateAward = awars

        if (awars == null) {
            const awarsOld: number = 50.00
            const insert = await prisma.award.create({
                data: {
                    total_prizes: awarsOld,
                    subtract_premiums: awarsOld,
                    seine: (awarsOld * 75) / 100,
                    corner: (awarsOld * 15) / 100,
                    block: (awarsOld * 10) / 100,
                    gamer_ref: 1,
                    home_deposit: 50.00
                }
            })
            // console.log(insert);

        } else {
            if (awars?.is_completed != "IN_PROCESSING") {
                const insert = await prisma.award.create({
                    data: {
                        total_prizes: RefUpdateAward?.subtract_premiums,
                        subtract_premiums: RefUpdateAward?.subtract_premiums,
                        seine: (Number(RefUpdateAward?.subtract_premiums) * 75) / 100,
                        corner: (Number(RefUpdateAward?.subtract_premiums) * 15) / 100,
                        block: (Number(RefUpdateAward?.subtract_premiums) * 10) / 100,
                        gamer_ref: RefUpdateAward?.gamer_ref! + 2,
                        is_completed: "IN_PROCESSING",
                    }
                })
                // console.log("StartTableAward.ts: ",insert);
                
            } else{
                // console.log("JÁ EXISTE UM RESULTADO EM PROCESSO.");
                
            }
        }

    }


}

export { StartTableAward }