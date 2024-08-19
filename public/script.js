const userVideo = document.getElementById('user-video')
const startButton = document.getElementById('start-btn')

//2 step; akhon kaj holo TCP te convert korte hobe, coz start button e click korle jate seta youtube,facebook e live e convert hoy, ar amara jani media TCP connection e streming kora jay na, er jonno amader streming korar jonno record kore kore binary te convert kore dekhate hobe

 let state ={media: null}
 //step 5: socket connetion
 const socket = io()

 //step 3: convert to binary; bitrate kom rakle video lagy holew cpu te kom prssure porbe, r bitrate besi hole cpu te onek besi presure porve
startButton.addEventListener('click',()=>{
    const mediaRecorder = new MediaRecorder(state.media,{
        audioBitsPerSecond:128000,  //128kbps s
        videoBitsPerSecond:2500000, //2500kbps
        framerate:25
    })

    //step 4: jokon kono binary data availabe hobe orthat j record kore j binary available ta access korbo
    mediaRecorder.ondataavailable = ev =>{
        console.log('binary stem available',ev.data)
    }

    mediaRecorder.start(25)
})



//1 setp 
window.addEventListener('load',async(event)=>{
    const media = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    state.media = media
    userVideo.srcObject = media
})