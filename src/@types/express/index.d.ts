import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string,
                code_ref_user: string,
                email: string,
                access_role: string,
                Establishment?: any
            }
            io: any
            region: string
        }
    }
}