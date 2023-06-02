import { prisma } from "../db/database"
import { PasswordHash } from "../utils/PasswordHash";


class UsuariosCRUDDatabase {

    static async CreateNewUser(email: string, password: string) {
        // VERIFCIAR SE O USUÁRIO JÁ EXISTE
        try {

            if (email == "" || password == "") {
                return { error: "Preencha todos os campos" }
            }

            const ExistingUser = await prisma.user.findFirst({ where: { email: email } });

            if (ExistingUser) {
                return { error: "usuário já cadastrado." }
            }

            const NewPassword = await PasswordHash.CreatedHash(password)
            const UserCreated = await prisma.user.create({
                data: {
                    email,
                    password: NewPassword,
                    code_ref_user: "ADM1904KUP",
                    access_role: "SUPERADMIN"
                }
            })

            return UserCreated

        } catch (error) {
            return error
        }
    }

}


export { UsuariosCRUDDatabase }