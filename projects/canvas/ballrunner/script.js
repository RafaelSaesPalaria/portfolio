var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height= innerHeight

addEventListener("keydown",keyhandler)
addEventListener("keyup",keyhandler)

var up = false
var down = false
var right = false
var left = false
function keyhandler(event) {
    direction = true
    if (event.type === "keyup") {
        direction = false
    }
    switch (event.key) {
        case 'w':
            up = direction
            break;
        case 's':
            down = direction
            break;
        case 'a':
            left = direction
            break
        case 'd':
            right = direction
            break
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

    this.keyboardMoviment = function() {
        if (up & !down & (canvas.height-this.y-this.radius<30)) {
            this.dy=-this.speed*7
        } else if (!up & down) {
            this.dy+=this.speed
        } else {

        }

        if (left & !right) {
            this.dx-=this.speed/2
        } else if (!left & right) {
            this.dx+=this.speed/2
        } else {
            
        }
    }

    this.update = function() {

        this.keyboardMoviment()

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