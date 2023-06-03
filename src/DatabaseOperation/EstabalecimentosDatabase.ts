import { prisma } from "../db/database"
import { MESSAGE_CUSTOM, SUCCESS } from "../utils/message"

class EstabalecimentosDatabase {
    static async create(userId: string, name: string, number_phone: string, number_code: string, seller_code: string, description: string) {
        console.log(userId);
        
        try {
            const content = await prisma.establishment.create({
                data: {
                    userId,
                    name,
                    number_phone,
                    number_code,
                    seller_code,
                    description,

                }
            })
            return { status: true, message: SUCCESS, data: content }
        } catch (error) {
            return { status: true, message: error, data: [] }
        }
    }
}


export { EstabalecimentosDatabase }