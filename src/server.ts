import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import http from "http"
import cors from "cors"
import path from "path"
import nunjucks from "nunjucks"
import { Server } from 'socket.io';

import { r } from "./router";

const app = express()
const serverHttp = http.createServer(app);

app.use(cors())

app.use("/static", express.static(path.join(__dirname, 'static')))

nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true,

});
app.set('view engine', 'html');

// VERIFICAR A TABELA DE PREMIOS E INICIALA SE NECESSÁRIO.
StartTableAward.starting().catch(i => console.log(i))

const io = new Server(serverHttp, {
    cors: {
        origin: ["http://127.0.0.1:5500", "http://192.168.0.111:5173", "http://127.0.0.1:5174", "http://192.168.0.111","http://192.168.0.103:5005"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATH"]
    }
});

io.on('connection', (socket: any) => {
    
    socket.emit("__CLEAN__")
    socket.join(socket.id)

    socket.on("/BUSCAR_DADOS_HORA", async (_BUSCAR_DADOS_HORA) => {
        const hours = await JogosDatabase.searchForTheLastGame()
        socket.emit("/BUSCAR_DADOS_HORA", hours)
    })

    socket.on("/BUSCAR_ULTIMO_ID_GAMER", async () => {
        const last_id = await BuscarUltimoIdoResultado.getId()
        socket.emit("/BUSCAR_ULTIMO_ID_GAMER", last_id)
    })

    socket.on("/BUSCAR_VALORES_APOSTA", async () => {
        const valores = await BuscarUltimoValorPremio.buscarValoresDosPremios()
        socket.emit("/BUSCAR_VALORES_APOSTA", valores)
    })

})


app.use(express.json())

app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD, PATH")
    response.header("Access-Control-Allow-Headers", "*")
    next()
})
app.use(r)
import { CronJobGamer } from "./cron/CronJobGamer";
import { JogosDatabase } from "./DatabaseOperation/JogosDatabase"
import { StartTableAward } from "./services/StartTableAward"
import { BuscarUltimoIdoResultado } from "./utils/socket/BuscarUltimoIdoResultado"
import { BuscarUltimoValorPremio } from "./utils/socket/BuscarUltimoValorPremio"


BuscarUltimoValorPremio.buscarValoresDosPremios().then(t=>console.log(t))
CronJobGamer.startGamer(io)



// @ts-ignore
serverHttp.listen(process.env.PORT || 4008, "0.0.0.0", () => {
    console.log(`server running... 🐱‍🏍 http://0.0.0.0:${process.env.PORT}`)
})