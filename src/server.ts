import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import http from "http"
import path from "path"
import nunjucks from "nunjucks"
import { Server } from 'socket.io';

import { r } from "./router";

const app = express()
const serverHttp = http.createServer(app);

app.use("/static", express.static(path.join(__dirname, 'static')))

nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true,
    noCache: true,
    watch: true,

});
app.set('view engine', 'html');


const io = new Server(serverHttp, {
    cors: {
        origin: ["http://127.0.0.1:5500","http://192.168.0.111:5173","http://127.0.0.1:5174"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATH"]
    }
});

io.on('connection', (socket: any) => {
    socket.emit("__CLEAN__")    
    socket.join(socket.id)
})


app.use(express.json())
app.use(r)
app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD, PATH")
    response.header("Access-Control-Allow-Headers", "*")
    next()
})

import { CronJobGamer } from "./cron/CronJobGamer";


CronJobGamer.startGamer(io)



// @ts-ignore
serverHttp.listen(process.env.PORT || 4008, "0.0.0.0", () => {
    console.log(`server running... 🐱‍🏍 http://0.0.0.0:${process.env.PORT}`)
})