
import { Router } from "express"
import { BetController } from "../controllers/BetController"
import { CheckBetController } from "../controllers/CheckBetController"
import { HomeController } from "../controllers/HomeController"
import { UsersController } from "../controllers/UsersController"

const r = Router()

r.get("/", HomeController.index)

r.get("/v1/check/:numbers", CheckBetController.check)
r.get("/maior", CheckBetController.maior)
r.post("/v1/bet", BetController.create)

r.post("/v1/users", UsersController.CreateNewUser)

r.get("/v1/recover-password/:code", (request, response) => {
    const code = request.params.code;

    response.json(code)
})

export { r }