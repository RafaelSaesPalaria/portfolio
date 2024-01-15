//Global Variables
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

/**
 * Called: by itself at every 1 second
 * Do: add 1 to game.time
 */
setInterval(countTime,1000)
function countTime() {
    game.time+=1
}

/**
 * Called: When the player is created
 * Do: execute all the methods that are subscribed when a keyup or a keydown happens
 * @returns the subscribe method
 */
function addKeyListener() {
    const state = {
        observers : []
    }

    addEventListener("keyup",notifyAll)
    addEventListener("keydown",notifyAll)

    /**
     * Called: When the player is created
     * Do: Add the function to the state.observers array
     * @param {Function} functionObserver the function to be executed
     */
    function subscribe(functionObserver) {
        state.observers.push(functionObserver)
    }

    /**
     * Called: When a keyup/keydown happens
     * Do: Execute all methods in state.observers
     * @param {Object} command the keyboard event
     */
    function notifyAll(command) {
        state.observers.forEach(functionObserver => {
            functionObserver(command)
        })
    }

    return {
        subscribe       
    }
}

/**
 * Called: [Abstract] When a child is created (Player/Point/Enemy)
 * Do: Create the circle generic model
 */
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
    
    /**
     * Called: When the circle updates
     * Do: Draw a circle using this.x, this.y, this.radius, this.color
     */
    draw() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }

    /**
     * Called: When a child needs a generic update
     * Do: Change the position then redraw
     */
    update() {
        this.x+=this.dx
        this.y+=this.dy
        this.draw();
    }

}

/**
 * Called: When the game is started/restarted
 * Do: Create and operate the enemies
 */
class Enemy extends Circle {
    constructor() {
        super()
        this.y = (canvas.height/2+this.radius+Math.random()*((canvas.height/2)-2*this.radius)); 
        this.x = canvas.width+this.radius
        this.dx= -10-(Math.random()*(canvas.width/1000))
        this.radius=25
        this.color="blue"
    }

    /**
     * Called: At every frame
     * Do: Check if the player died or if the enemy is out of the screen then teleport him back
     */
    update() {
        entities.players.forEach(player => {
            if (isColliding(this,player)) {
                player.die()
            }
        })

        //Check if the enemy is not visible anymore
        if (this.x+this.radius<0 || this.y+this.radius>canvas.height) { 
            

            if (Math.random()>0.5) { // Vertical Attack
                this.y = (canvas.height/2+this.radius+Math.random()*((canvas.height/2)-2*this.radius));
                this.x = canvas.width+this.radius
                this.dx= -10-(Math.random()*(canvas.width/1000))
                this.dy = 0

            } else { //Horizontal Attack
                this.x = (this.radius+Math.random()*((canvas.width)-2*this.radius));
                this.y = 0
                this.dy= +10+(Math.random()*(canvas.height/1000))
                this.dx = 0
            }
        }   

        super.update()
    }
}

/**
 * Called: When the game is started or restarted
 * Do: Create and operate the points
 */
class Points extends Circle {
    constructor() {
        super()
        this.color = "green"
        this.radius*=0.7
        this.x = this.radius+(Math.random()*(canvas.width-2*this.radius))
        this.y = this.radius+(Math.random()*(canvas.height-2*this.radius))
    }

    /**
     * Called: At every frame
     * Do: Check if the player get the point and teleport him to a random point of the screen
     */
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

/**
 * Called: When the game is started/restarted
 * Do: Create the player circle
 */
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

    /**
     * Called: When the keylistener call (keyup/keydown)
     * Do: change the up/left/right/down attributes based on the keyevent
     * @param {Object} event 
     */
    keyhandler(event) {
        this.event = event
        this.direction = !(this.event.type === "keyup")
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

    /**
     * Called: When the player updates
     * Do: change the dx and dy based on the up/left/right/down attributes 
     */
    keyboardMoviment() {
        if (this.up & !this.down & (canvas.height-this.y-this.radius<30)) {
            this.dy=-this.speed*7
        } else if (!this.up & this.down) {
            this.dy+=this.speed
        } else {

        }

        if (this.left & !this.right & (this.dx>-this.maxSpeed)) {
            this.dx-=this.speed/2
        } else if (!this.left & this.right & (this.dx<this.maxSpeed)) {
            this.dx+=this.speed/2
        } else {
            
        }
    }

    /**
     * Called: At every frame
     * Do: Change the position based on the speed
     */
    update() {
        this.keyboardMoviment()
        
        //Makes the player tend to be stand still
        if (this.dx>0) {
            this.dx-=1
        } else if (this.dx<0) {
            this.dx+=1
        }

        //Bounces if touch a horizontal edge
        if (this.x+this.radius+this.dx>canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        //Bounces if touch a vertical edge
        if (this.y+this.radius+this.dy>canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy * this.friction
        } else {
            this.dy+=this.gravity
        }

        super.update()
    }

    /**
     * Called: When a enemy touch the player
     * Do: Show the death message
     */
    die() {
        showDeathMessage()
    }
}

/**
 * Called: When a enemy touch the player
 * Do: Pause the game and show the death panel with the currently time and score
 */
function showDeathMessage() {
    game.alive = false
    dieScreen.style.display = "block"
    dieScreenTime.innerText = `${game.time} Seconds\n${game.score} Points`
}

/**
 * Called: When the player click on the restart button (after die)
 * Do: hide the death message
 */
function hideDeathMessage() {
    dieScreen.style.display = "none"
}
 
/**
 * Called: When the game start/restart
 * Do: Set the initial values of the game and start the game
 */
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

/**
 * Called: When a enemy or a point updates
 * Do: Check if the circle1 (enemy/point) is colling with the circle2 (player)
 * @param {Circle} circle1 
 * @param {Circle} circle2 
 * @returns true if the are colliding, false if they aren't
 */
function isColliding(circle1, circle2) {
    if ((circle1.x - (circle2.x)< circle2.radius+circle1.radius & circle1.x - (circle2.x) >-circle2.radius-circle1.radius)&
    (circle1.y - (circle2.y) < circle2.radius+circle1.radius & circle1.y - (circle2.y) >-circle2.radius-circle1.radius)) {
        return true
    } else {
        return false
    }
}

/**
 * Called: When the screen resizes or the game start
 * Do: change the size of the canvas
 */
addEventListener("resize",resize)
function resize() {
    canvas.width = innerWidth*0.95
    canvas.height= innerHeight*0.7
}

/**
 * Called: When a point is adquired
 * Do: Update the value of the scoreboard
 */
function updateScoreSpan() {
    highscoreScreen.innerText = `Highscore: ${game.highscore}`
    scoreScreen.innerText = `Score: ${game.score}`
}

/**
 * Called: When the game start or when the frame updates
 * Do: Update the entities and clear the screen
 */
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