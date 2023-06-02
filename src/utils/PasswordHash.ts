import bcrypt from "bcrypt"
class PasswordHash {
    static async CreatedHash(password: string) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    }

}

export { PasswordHash }