var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height= innerHeight

var interval = 1

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
    timeInSeconds+=1
}

function getAngle(currentlyCycle,maxCycle) {
    return (currentlyCycle/maxCycle)*360
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
        this.angle = 180
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.save()
        c.translate(this.x,this.y)
        c.rotate(-this.angle)
        c.fillRect(0,-this.height/2,this.width,this.height)
        c.restore()
        c.closePath()
    }
    update(angle) {
        this.angle = angle
        this.draw()
    }
}

var p1 = new Pointer(100,7,"red");
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    frames.frame

    drawClock()
    updateTime()
    let seconds = timeInSeconds%60
    console.log(seconds)
    p1.update(getAngle(seconds,60))
}

getTime()
animate()
setInterval(animate,interval*1000)