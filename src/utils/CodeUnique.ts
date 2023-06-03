import { randomUUID } from "crypto";
import { prisma } from "../db/database";


class CodeUnique {
    static async code() {
        return this._FN_LOCAL_REGENERATED()
    }

    static async _FN_LOCAL_REGENERATED() {
        return randomUUID().split("-")[0].substring(0, 4).toUpperCase()
    }
}

export { CodeUnique }