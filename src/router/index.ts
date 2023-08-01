
import { Router } from "express"
import { BetController } from "../controllers/BetController"
import { CheckBetController } from "../controllers/CheckBetController"
import { HomeController } from "../controllers/HomeController"


import { UsersController } from "../controllers/UsersController"
import { ResetPasswordController } from "../controllers/ResetPasswordController"
import { Auth } from "../middleware/authenticated"
import { randomUUID } from "crypto"
import { EstablishmentController } from "../controllers/EstablishmentController"
import { AdressesController } from "../controllers/AdressesController"
import { ExemploController } from "../controllers/ExemploController"
import { DepositarDinheiroManualAdminController } from "../controllers/DepositarDinheiroManualAdminController"

const r = Router()

// r.get("/", HomeController.index)

r.get("/v1/check/:numbers", CheckBetController.check)
r.get("/maior", CheckBetController.maior)

r.post("/v1/bet", Auth, BetController.create)

r.post("/v1/users/register", UsersController.CreateNewUser)
r.post("/v1/users/login", UsersController.Login)

r.post("/v1/recover-password", UsersController.recover_password)
r.post("/v1/recover-password/:uuid", UsersController.update_recover_password)

r.post("/v1/establishment", Auth, EstablishmentController.create)

r.post("/v1/adresses/:establishmentId", AdressesController.create)

r.post("/v1/auth/verify", Auth, (req, res) => {
    console.log(req.user);
    res.send(req.user)
})

r.post("/v1/app-diversity/establishment", Auth, (req, res) => {
    res.send({ user: req.user })
})

r.get("/exemplo/:id", ExemploController.init)

r.post("/v1/adiciona-dinheiro", DepositarDinheiroManualAdminController.create)

export { r }