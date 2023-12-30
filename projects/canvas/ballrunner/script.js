var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
var entities = {
    enemys : [],
    players : [],
    points : []
}
var game = {
    alive: true,
    time: 0,
    score: 0,
    highscore: 0
}

var dieScreen = document.querySelector("div#end")
var dieScreenTime = document.querySelector("div#end span#time")
var highscoreScreen = document.querySelector("div#scoreboard span#highscore")
var scoreScreen = document.querySelector("div#scoreboard span#score")

setInterval(countTime,1000)
function countTime() {
    game.time+=1
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
        entities.players.forEach(player => {
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

        entities.players.forEach(player => {
            if (isColliding(this,player)) {
                game.score+=1
                if (game.score>game.highscore) {
                    game.highscore = game.score
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
        addKeyListener().subscribe(this.keyhandler.bind(this))
        this.direction = true
        this.event = undefined
        this.up = false
        this.left = false
        this.right=false
        this.down=false
    }

    keyhandler(event) {
        this.event = event
        this.direction = !(this.event.type === "keyup")
        //Give the direction based on the key pressed or released
        switch (this.event.key) {
            case 'w':
                this.up = this.direction
                break;
            case 's':
                this.down = this.direction
                break;
            case 'a':
                this.left = this.direction
                break
            case 'd':
                this.right = this.direction
                break
        }
    }

    keyboardMoviment() {
        //Accelerate the ball vertically
        if (this.up & !this.down & (canvas.height-this.y-this.radius<30)) {
            this.dy=-this.speed*7
        } else if (!this.up & this.down) {
            this.dy+=this.speed
        } else {

        }

        //Accelerate the ball Horizontaly
        if (this.left & !this.right & (this.dx>-this.maxSpeed)) {
            this.dx-=this.speed/2
        } else if (!this.left & this.right & (this.dx<this.maxSpeed)) {
            this.dx+=this.speed/2
        } else {
            
        }
    }

    update() {
        this.keyboardMoviment()
        
        //Always dessacelerate ball
        if (this.dx>0) {
            this.dx-=1
        } else if (this.dx<0) {
            this.dx+=1
        }

        //Change Direction if touch boundaries
        if (this.x+this.radius+this.dx>canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        //Gravity + Change Direction if touch boundaries
        if (this.y+this.radius+this.dy>canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy * this.friction
        } else {
            this.dy+=this.gravity
        }

        super.update()
    }

    die() {
        showDeathMessage()
    }
}

function showDeathMessage() {
    game.alive = false
    dieScreen.style.display = "block"
    dieScreenTime.innerText = `${game.time} Seconds\n${game.score} Points`
}

function hideDeathMessage() {
    dieScreen.style.display = "none"
}
 
function init() {
    game.time = 0
    game.score = 0
    game.alive = true
    hideDeathMessage()
    resize()
    updateScoreSpan()
    entities.enemys = []
    entities.players = []
    entities.points = []
    entities.players.push(new Player())
    entities.enemys.push(new Enemy())
    entities.enemys.push(new Enemy())
    entities.points.push(new Points())
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
    highscoreScreen.innerText = `Highscore: ${game.highscore}`
    scoreScreen.innerText = `Score: ${game.score}`
}

function enemySpawn() {}

function animate() {
    if (game.alive) {
        c.clearRect(0,0,canvas.width,canvas.height)
        requestAnimationFrame(animate)

        entities.enemys.forEach(enemy =>{
            enemy.update()
        })

        entities.players.forEach(player =>{
            player.update()
        })

        entities.points.forEach(point => {
            point.update()
        })

    }
}

init()
animate()