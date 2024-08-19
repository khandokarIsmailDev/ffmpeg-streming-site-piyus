import http from 'http'  //http server nilam socket use korbo tai
import express from 'express'
import path from 'path'
import {Server as SocketIO} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

// public folder k aikhane join korlam.. sob html css file public folder e thakbe
app.use(express.static(path.resolve('./public')))

//socket connetion 
io.on('connetion',socket =>{
    console.log('Socket Conneted',socket.id)
})

server.listen(3000,()=>console.log(`HTTP Server is Running PORT 3000 `))