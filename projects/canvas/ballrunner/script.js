var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height= innerHeight

function Player() {
    this.x = 200
    this.y = 200
    this.radius = 50
    this.color = "red"
    
    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
}

var player = new Player()
function init() {
    player.draw()
}

init()