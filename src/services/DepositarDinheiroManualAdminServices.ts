import { prisma } from "../db/database"

class DepositarDinheiroManualAdminServices {
    static async depositar(amount: number) {
        const award = await prisma.award.findFirst({ where: { is_completed: "IN_PROCESSING" }, orderBy: { gamer_ref: "desc" }, take: 1 });
        const _id = award?.id;
        const valoues_amount = Number(award?.subtract_premiums) + Number(amount);



        const award_update = await prisma.award.update({
            where: { id: _id }, data: {
                subtract_premiums: valoues_amount,
                seine: (Number(valoues_amount) * 75) / 100,
                corner: (Number(valoues_amount) * 15) / 100,
                block: (Number(valoues_amount) * 10) / 100,
                home_deposit: Number(amount)
            }
        })

        console.log(award_update);

        return award_update


    }
}


export { DepositarDinheiroManualAdminServices }