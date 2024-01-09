var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height= innerHeight

var interval = 1

import Pointer from "./pointer.js"

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

var p1 = new Pointer(c,clockLocation,100,7,"red");
var p2 = new Pointer(c,clockLocation,100,7,"white");
var p3 = new Pointer(c,clockLocation,100,7,"white");
function animate() {
    //c.clearRect(0,0,canvas.width,canvas.height)

    let seconds = timeInSeconds%60
    let minutes = timeInSeconds%3600/60
    let hours = timeInSeconds/3600

    drawClock()
    updateTime()

    console.log(hours+" "+minutes+" "+seconds)
    p1.update(getAngle(Math.floor(seconds),60))
    p2.update(getAngle(Math.floor(minutes),60))
    p3.update(getAngle(Math.floor(hours),24))
}

getTime()
animate()
setInterval(animate,interval*1000)