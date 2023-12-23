var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height= innerHeight

addEventListener("keydown",keyhandler)

function keyhandler(event) {
    switch (event.key) {
        case 'w':
            player.dy-=10
            break;
        case 's':
            player.dy+=10
            break;
        case 'a':
            player.dx-=10
            break
        case 'd':
            player.dx+=10
            break
        break;
    }
}

function Player() {
    this.x = 200
    this.y = 200
    this.dx=0
    this.dy=0
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

    this.update = function() {

        if (this.x+this.radius+this.dx>canvas.width) {
            this.dx = -this.dx
        }

        this.x+=this.dx
        this.y+=this.dy
        this.draw();
    }

}

var player = new Player()
function init() {
    
}
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)

    player.update()
}

init()
animate()