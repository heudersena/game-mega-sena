import { prisma } from "../db/database";

import { v4 } from "uuid";
import { CLASSSendEmail } from "./SendMail";
import { PasswordHash } from "../utils/PasswordHash";

class CheckExistEmail {

    static async update(uuid: string, new_password: string) {
        const content = await prisma.user.findFirst({ where: { recover_password: uuid } })

        const password = await PasswordHash.CreatedHash(new_password)
        if (content != null) {
            const contents = await prisma.user.update({
                where: { id: String(content?.id) }, data: {
                    password
                }
            })
            return { status: true }
        } else {
            return { status: false }
        }

    }

    static async handle(email: string) {
        const uuid = v4()
        const content = await prisma.user.findUnique({ where: { email } })

        if (content) {
            await prisma.user.update({
                where: { email }, data: {
                    recover_password: uuid
                }
            }).then(r => {
                const base_url = process.env.LINK_EMAIL_RECOVER
                new CLASSSendEmail({ to: email, title: "Recupere sua senha", body: `${base_url}/recover-password/${uuid}` }).send()
            })

        }

    }
}


export { CheckExistEmail }