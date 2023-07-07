import { prisma } from "../db/database";
import { ERROR, SUCCESS } from "../utils/message";


class EnderecosDatabase {
    static async create(cep: string, state: string, city: string, neighborhood: string, street: string, number: string, geographic_location: string, latitude: string, longitude: string, establishmentId: number) {
        try {
            const content = await prisma.address.create({
                data: {
                    cep, state, city, neighborhood, street, number, geographic_location, latitude, longitude, establishmentId
                }
            })
            return { status: false, message: SUCCESS, data: content }
        } catch (error) {
            console.log(error);
            
            return { status: true, message: ERROR, data: [] }
        }
    }
}

export { EnderecosDatabase }