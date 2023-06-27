import { Request, Response } from "express";
import { DepositarDinheiroManualAdminServices } from "../services/DepositarDinheiroManualAdminServices";


class DepositarDinheiroManualAdminController {

    static async create(request: Request, response: Response) {
        try {
            const { amount } = request.body ?? 50
            const content = await DepositarDinheiroManualAdminServices.depositar(Number(amount))
            request.io.emit("/BUSCAR_VALORES_APOSTA", {
                subtract_premiums: content?.subtract_premiums,
                seine: content?.seine,
                corner: content?.corner,
                block: content?.block
            })
            return response.json(content)
        } catch (error) {
            return response.json(error)

        }

    }


}


export { DepositarDinheiroManualAdminController }