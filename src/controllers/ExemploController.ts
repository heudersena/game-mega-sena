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

        const data = {
            four: (contagens["4"] ?? 0),
            five: contagens["5"] ?? 0,
            six: contagens["6"] ?? 0
        }

        response.json({ data, quantidade, betContent })

    }

}

export { ExemploController }