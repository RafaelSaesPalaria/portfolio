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

class Circle {
    constructor() {
        this.x = 200
        this.dx=0
        this.dy=0
        this.radius = 30
        this.y = canvas.height-this.radius
        this.color = "red"
        this.gravity = 1.5
        this.friction = 0
        this.speed = 5
    }
    
    draw() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }

    update() {
        
        this.x+=this.dx
        this.y+=this.dy
        this.draw();
    }

}

class Enemy extends Circle {
    constructor() {
        super()
        this.y = (canvas.height/2+this.radius+Math.random()*((canvas.height/2)-2*this.radius)); 
        this.x = canvas.width+this.radius
        this.dx= -10-(Math.random()*30)
        this.radius=25
        this.color="blue"
    }
    update() {
        players.forEach(player => {

        
        if ((player.x - (this.x) - this.dx< this.radius+player.radius & player.x - (this.x) + this.dx>-this.radius-player.radius)&
        (player.y - (this.y) - this.dy < this.radius+player.radius & player.y - (this.y) + this.dy>-this.radius-player.radius)) {
            player.die()
        }
        })

        if (this.x+this.radius<0 || this.y+this.radius>canvas.height) {
            if (Math.random()>0.5) {
                this.y = (canvas.height/2+this.radius+Math.random()*((canvas.height/2)-2*this.radius));
                this.x = canvas.width+this.radius
                this.dx= -10-(Math.random()*30)
                this.dy = 0
            } else {
                this.x = (this.radius+Math.random()*((canvas.width)-2*this.radius));
                this.y = 0
                this.dy= +10+(Math.random()*20)
                this.dx = 0
            }
        }   

        super.update()
    }
}

class Player extends Circle {
    constructor() {
        super()
        this.color="red"
        this.maxSpeed = 30
    }

    keyboardMoviment() {
        if (up & !down & (canvas.height-this.y-this.radius<30)) {
            this.dy=-this.speed*7
        } else if (!up & down) {
            this.dy+=this.speed
        } else {

        }

        if (left & !right & (this.dx>-this.maxSpeed)) {
            this.dx-=this.speed/2
        } else if (!left & right & (this.dx<this.maxSpeed)) {
            this.dx+=this.speed/2
        } else {
            
        }
    }

    update() {
        this.keyboardMoviment()
        
        if (this.dx>0) {
            this.dx-=1
        } else if (this.dx<0) {
            this.dx+=1
        }

        if (this.x+this.radius+this.dx>canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        if (this.y+this.radius+this.dy>canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy * this.friction
        } else {
            this.dy+=this.gravity
        }

        super.update()
    }

    die() {
        this.color = "purple"
    }

}



var enemys = []
var players = []
function init() {
    players.push(new Player())
    enemys.push(new Enemy())
    enemys.push(new Enemy())
}
function enemySpawn() {}

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)

    enemys.forEach(enemy =>{
        enemy.update()
    })

    players.forEach(player =>{
        player.update()
    })

}

init()
animate()