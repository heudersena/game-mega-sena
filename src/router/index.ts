
import { Router } from "express"
import { BetController } from "../controllers/BetController"
import { CheckBetController } from "../controllers/CheckBetController"
import { HomeController } from "../controllers/HomeController"
import { UsersController } from "../controllers/UsersController"
import { ResetPasswordController } from "../controllers/ResetPasswordController"

const r = Router()

r.get("/", HomeController.index)

r.get("/v1/check/:numbers", CheckBetController.check)
r.get("/maior", CheckBetController.maior)
r.post("/v1/bet", BetController.create)

r.post("/v1/users", UsersController.CreateNewUser)

r.post("/v1/recover-password", ResetPasswordController.handle)
r.get("/v1/recover-password/:uuid", ResetPasswordController.handleExecute)

export { r }