var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
var alive = true

var up = false
var down = false
var right = false
var left = false
var time =  0
var score = 0
var highscore = 0

setInterval(countTime,1000)
function countTime() {
    time+=1
}

function addKeyListener() {
    const state = {
        observers : []
    }

    addEventListener("keyup",notifyAll)
    addEventListener("keydown",notifyAll)

    function subscribe(functionObserver) {
        state.observers.push(functionObserver)
    }

    function notifyAll(command) {
        state.observers.forEach(functionObserver => {
            functionObserver(command)
        })
    }

    return {
        subscribe       
    }
}

addEventListener("resize",resize)
addKeyListener().subscribe(keyhandler)

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
        this.speed = 6
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
        this.dx= -10-(Math.random()*(canvas.width/1000))
        this.radius=25
        this.color="blue"
    }
    update() {
        players.forEach(player => {
            if (isColliding(this,player)) {
                player.die()
            }
        })

        if (this.x+this.radius<0 || this.y+this.radius>canvas.height) {
            if (Math.random()>0.5) {
                this.y = (canvas.height/2+this.radius+Math.random()*((canvas.height/2)-2*this.radius));
                this.x = canvas.width+this.radius
                this.dx= -10-(Math.random()*(canvas.width/1000))
                this.dy = 0
            } else {
                this.x = (this.radius+Math.random()*((canvas.width)-2*this.radius));
                this.y = 0
                this.dy= +10+(Math.random()*(canvas.height/1000))
                this.dx = 0
            }
        }   

        super.update()
    }
}

class Points extends Circle {
    constructor() {
        super()
        this.color = "green"
        this.radius*=0.7
        this.x = this.radius+(Math.random()*(canvas.width-2*this.radius))
        this.y = this.radius+(Math.random()*(canvas.height-2*this.radius))
    }
    update() {
        super.update()

        players.forEach(player => {
            if (isColliding(this,player)) {
                score+=1
                if (score>highscore) {
                    highscore = score
                }
                updateScoreSpan()
                this.x = this.radius+(Math.random()*(canvas.width-2*this.radius))
                this.y = this.radius+(Math.random()*(canvas.height-2*this.radius))
            }
        })

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
        alive = false
        let dieScreen = document.querySelector("div#end")
        dieScreen.style.display = "block"
        let dieScreenTime = document.querySelector("div#end span#time")
        dieScreenTime.innerText = `${time} Seconds\n${score} Points`
    }
}

var enemys = []
var players = []
var points = []
function init() {
    time = 0
    score = 0
    alive = true
    document.querySelector("div#end").style.display = "none"
    resize()
    updateScoreSpan()
    enemys = []
    players = []
    points = []
    players.push(new Player())
    enemys.push(new Enemy())
    enemys.push(new Enemy())
    points.push(new Points())
    animate()
}

function isColliding(circle1, circle2) {
    if ((circle1.x - (circle2.x)< circle2.radius+circle1.radius & circle1.x - (circle2.x) >-circle2.radius-circle1.radius)&
    (circle1.y - (circle2.y) < circle2.radius+circle1.radius & circle1.y - (circle2.y) >-circle2.radius-circle1.radius)) {
        return true
    } else {
        return false
    }
}

function resize() {
    canvas.width = innerWidth*0.95
    canvas.height= innerHeight*0.7
}

function updateScoreSpan() {
    document.querySelector("div#scoreboard span#highscore").innerText = `Highscore: ${highscore}`
    document.querySelector("div#scoreboard span#score").innerText = `Score: ${score}`
}

function enemySpawn() {}

function animate() {
    if (alive) {
        c.clearRect(0,0,canvas.width,canvas.height)
        requestAnimationFrame(animate)

        enemys.forEach(enemy =>{
            enemy.update()
        })

        players.forEach(player =>{
            player.update()
        })

        points.forEach(point => {
            point.update()
        })

    }
}

init()
animate()