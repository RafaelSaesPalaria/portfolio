var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height= innerHeight

var timeInSeconds = 0
var clockLocation = {
    x: canvas.width/2,
    y: canvas.height/3*1
}

function getTime() {
    let hours = new Date().getHours()
    let minutes= new Date().getMinutes()
    let seconds = new Date().getSeconds()

    timeInSeconds = (hours*3600)+(minutes*60)+seconds

    console.log(timeInSeconds)
}

function updateTime() {

}

function drawClock() {
    let x = clockLocation.x
    let y = clockLocation.y
    let radius = 120

    c.beginPath()
    c.fillStyle = "gray"
    c.arc(x,y,radius,0,Math.PI*2,false)
    c.fill()
    c.closePath()
}

class Pointer {
    constructor(width, thichness, color) {
        this.x = clockLocation.x
        this.y = clockLocation.y
        this.width = width
        this.height = thichness
        this.color = color
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.x,this.y,this.width,this.height)
        c.closePath()
    }
    update() {

        this.draw()
    }
}

var p1 = new Pointer(100,10,"red");
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)

    drawClock()
    p1.update()
}

getTime()
animate()