var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height= innerHeight

var timeInSeconds = 0


function getTime() {
    let hours = new Date().getHours()
    let minutes= new Date().getMinutes()
    let seconds = new Date().getSeconds()

    timeInSeconds = (hours*3600)+(minutes*60)+seconds

    console.log(timeInSeconds)
}

function drawClock() {
    let x = canvas.width/2
    let y = canvas.height/3*1
    let radius = 120

    c.beginPath()
    c.arc(x,y,radius,0,Math.PI*2,false)
    c.fill()
    c.closePath()
}

function drawPointer() {

}

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)

    drawClock()
}

getTime()
animate()