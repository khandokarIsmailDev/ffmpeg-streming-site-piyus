import http from 'http'  //http server nilam socket use korbo tai
import express from 'express'
import path from 'path'

const app = express()
const server = http.createServer(app)

// public folder k aikhane join korlam.. sob html css file public folder e thakbe
app.use(express.static(path.resolve('./public')))

server.listen(3000,()=>console.log(`HTTP Server is Running PORT 3000 `))