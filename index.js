import http from 'http'  //http server nilam socket use korbo tai
import express from 'express'
import path from 'path'
import { spawn } from 'child_process'  //1.last stpe for setup ffmpeg
import {Server as SocketIO} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

//2.last step for ffmpeg; option use korbo live strema korar jonno 
const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    // `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`
];

const ffmpegProcess = spawn('ffmpeg',options) //3

ffmpegProcess.stdout.on('data',data =>{ //5 ffmpeg thik moto kaj korse kina , ta identify kora 
    console.log(`ffmpeg stdout: ${data}`)
})

ffmpegProcess.stderr.on('data',data =>{ //6 jokhoni ffmpeg e kono data asbe tokon setaw dekte parbo
    console.log(`ffmpeg stderr: ${data}`)
})

ffmpegProcess.on('close',code =>{ //5 ffmpeg thik moto kaj korse kina , ta identify kora 
    console.log(`ffmpeg process exited code: ${code}`)
})

// public folder k aikhane join korlam.. sob html css file public folder e thakbe
app.use(express.static(path.resolve('./public')))

//socket connetion 
io.on('connection',socket =>{
    console.log('Socket Conneted',socket.id)
    socket.on('binarystream',stream =>{
        console.log('Binary Stram Incoming...')
        ffmpegProcess.stdin.write(stream,(err) =>{  //4
            console.log('error',err)
        })
    })
})

server.listen(3000,()=>console.log(`HTTP Server is Running PORT 3000 `))