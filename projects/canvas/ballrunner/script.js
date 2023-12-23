var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height= innerHeight

addEventListener("keydown",keyhandler)

function keyhandler(event) {
    switch (event.key) {
        case 'w':
            player.dy-=player.speed
            break;
        case 's':
            player.dy+=player.speed
            break;
        case 'a':
            player.dx-=player.speed
            break
        case 'd':
            player.dx+=player.speed
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
    this.speed = 5
    
    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }

    this.update = function() {

        if (this.dx>0) {
            this.dx-=1
        } else if (this.dx<0) {
            this.dx+=1
        }

        if (this.dy<0) {
            this.dy+=1
        }

        if (this.x+this.radius+this.dx>canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }
        
        if (this.y+this.radius+this.dy>canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy
        } else {
            this.dy+=1
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