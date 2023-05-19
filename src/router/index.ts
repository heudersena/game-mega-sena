
import { Router } from "express"
import { BetController } from "../controllers/BetController"
import { CheckBetController } from "../controllers/CheckBetController"
import { HomeController } from "../controllers/HomeController"

const r = Router()

r.get("/", HomeController.index)

r.get("/v1/check/:numbers", CheckBetController.check)
r.post("/v1/bet", BetController.create)
 


export { r }