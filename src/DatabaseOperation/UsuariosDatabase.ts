import { v4 } from 'uuid';
import { compareSync } from 'bcrypt';
import { prisma } from "../db/database"
import { PasswordHash } from "../utils/PasswordHash"
import { ERROR, MESSAGE_CUSTOM, SUCCESS } from "../utils/message"
import jsonwebtoken from "jsonwebtoken"
import { CLASSSendEmail } from '../services/SendMail';
import { CodeUnique } from '../utils/CodeUnique';
class UsuariosDatabase {


    static async register(email: string, password: string, access_role?: "SELLER") {

        try {
            if (await this._FN_LOCAL_CHECK_IF_THIS_EMAIL_EXISTS(email)) {
                return { status: false, message: MESSAGE_CUSTOM("ESSE EMAIL JÁ EXISTE NA BASE DE DADOS."), data: [] }
            }
            else {
                const passwordHash = await PasswordHash.CreatedHash(password)
                const code = access_role == "SELLER" ? await CodeUnique.code() : ""
                const content = await prisma.user.create({ data: { email, password: passwordHash, access_role, code_ref_user: String(code) } })
                if (content) {
                    return { status: false, message: SUCCESS, data: content }
                } else {
                    return { status: true, message: ERROR, data: content }
                }
            }
        } catch (error) {
            return { status: true, message: error, data: [] }
        }
    }
    static async login(email: string, password: string) {
        const PRIVATE_KEY = process.env.JWT_STRING

        const user = await prisma.user.findFirst({ where: { email } })

        const match_password = compareSync(password, String(user?.password!))


        if (match_password) {
            // @ts-ignore
            delete user?.password
            // @ts-ignore
            delete user?.recover_password
            // @ts-ignore
            delete user?.is_active
            // @ts-ignore
            delete user?.created_at
            // @ts-ignore
            delete user?.updated_at
            // @ts-ignore
            const token = jsonwebtoken.sign({ user: JSON.stringify(user) }, String(PRIVATE_KEY), { expiresIn: '60m' })
            return { status: false, message: SUCCESS, data: { token, user } }
        }


        return { status: true, message: MESSAGE_CUSTOM("E-MAIL OU SENHA INVÁLIDOS."), data: [] }


    }

    static async recovery_password(email: string) {
        // VERIFICAR SE O EMAIL EXISTE
        const existe_email = await this._FN_LOCAL_CHECK_IF_THIS_EMAIL_EXISTS(email)

        if (!existe_email) {
            return { status: true, message: MESSAGE_CUSTOM("E-MAIL INEXISTENTE NA BASE DE DADOS"), data: [] }
        }

        // GERAR CODE UNICO
        const uuid = v4()
        // REGISTRAR O CÓDIGO NO BANCO DE DADOS.
        const content = await prisma.user.update({ where: { email }, data: { recover_password: uuid } })
        // MANDAR EMAIL
        await new CLASSSendEmail({ to: email, title: `RECUPERA SUA SENHA ${new Date().toTimeString()}`, body: `http://192.168.0.111:4008/v1/recover-password/${uuid}` }).send().then(response => {
            return { status: false, message: SUCCESS, data: response }
        })
            .catch(error => {
                console.log(error);
                return { status: true, message: MESSAGE_CUSTOM("ERROR AO ENVIAR O E-MAIL"), data: [] }
            })
    }


    static async update_password(uuid: string, new_password) {
        // VERIFICAR SE EXEISTE ESSE CÓDIGO NA BASE DE DADOS

        const code_recover_exist = await prisma.user.findFirst({ where: { recover_password: uuid } })

        if (!code_recover_exist) {
            return { status: true, message: MESSAGE_CUSTOM("O CÓDIGO NÃO EXISTE OU ESTÁ EXPIRADAO."), data: [] }
        }

        const passwordHash = await PasswordHash.CreatedHash(new_password)

        const content = await prisma.user.update({
            where: { id: code_recover_exist?.id }, data: {
                password: passwordHash,
                recover_password: ""
            }
        })

        // @ts-ignore
        delete content?.password
        return { status: false, message: MESSAGE_CUSTOM("SENHA ATUALIZADA COM SUCESSO."), data: content }

    }




    static async _FN_LOCAL_CHECK_IF_THIS_EMAIL_EXISTS(email: string) {
        const content = await prisma.user.findUnique({ where: { email } })
        if (content) {
            return true
        }

        return false
    }


}



export { UsuariosDatabase }