import { Request, Response } from "express";
import { prisma } from "../db/database";

class ExemploController {

    static async init(request: Request, response: Response) {
        const _id = request.params.id
        const betContent = await prisma.bet.findMany({ where: { number_game_result: String(_id), AND: { hits_round: { gte: 4 }, AND: { awarded: true } } } })

        const quantidade = betContent.map(i => i.hits);

        var contagens = {};

        for (var i = 0; i < quantidade.length; i++) {
            var numero = quantidade[i];
            if (contagens[numero]) {
                contagens[numero]++;
            } else {
                contagens[numero] = 1;
            }
        }

        const award = await prisma.award.findFirst({ where: { gamer_ref: Number(_id) } })

        let totalValues = Number(award?.subtract_premiums)

        const four = contagens["4"] ?? 0
        const five = contagens["5"] ?? 0
        const six = contagens["6"] ?? 0
        console.log("ANTES: ", totalValues);

        let divisaoFour = 0;
        let divisaoFive = 0;
        let divisaoSix = 0;

        if (four != 0) {
            divisaoFour = Number(award?.block) / four
            totalValues = Number(totalValues) - Number(award?.block)
        }
        console.log("MEIO1: ", totalValues);
        if (five != 0) {
            divisaoFive = Number(award?.corner) / four
            totalValues = Number(totalValues) - Number(award?.corner)
        }
        if (six != 0) {
            divisaoSix = Number(award?.seine) / four
            totalValues = Number(totalValues) - Number(award?.seine)
        }
        console.log("divisaoFour: ", divisaoFour);
        console.log("divisaoFive: ", divisaoFive);
        console.log("divisaoSix: ", divisaoSix);


        console.log("DEPOIS: ", totalValues);
        // ATUALIZAR O GAME ATUAL

        const valuesFinal = totalValues > 0 ? totalValues: 50.00
        // CRIAR O PROXÍMO GAME

        console.log(valuesFinal);
        



        response.json({ totalValues, award, quantidade, betContent })

    }

}

export { ExemploController }