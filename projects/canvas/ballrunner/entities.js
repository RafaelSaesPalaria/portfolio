//Global Variables
export var entities = {
    enemys : [],
    players : [],
    points : []
}

import { canvasSize, game, updateScoreSpan } from "./game.js"
import { showDeathMessage } from "./script.js"

/**
 * Called: [Abstract] When a child is created (Player/Point/Enemy)
 * Do: Create the circle generic model
 */
class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.dx=0
        this.dy=0
        this.radius = radius
        this.y = y
        this.color = "red"
        this.gravity = 1.5
        this.friction = 0
        this.speed = 6
    }
    
    /**
     * Called: When the circle updates
     * Do: Draw a circle using this.x, this.y, this.radius, this.color
     * @param {canvasRenderingContext2D} c context to be drawn
     */
    draw(c) {
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
     * @param {canvasSizeRenderingContext2D} c context to be drawn
     */
    update(c) {
        if (c) {
            this.x+=this.dx
            this.y+=this.dy
            this.draw(c);
        } else {
            console.log("Undefided context")
        }
    }

}

/**
 * Called: When the game is started/restarted
 * Do: Create and operate the enemies
 */
export class Enemy extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
        this.y = (canvasSize.height/2+this.radius+Math.random()*((canvasSize.height/2)-2*this.radius)); 
        this.x = canvasSize.width+this.radius
        this.dx= -10-(Math.random()*(canvasSize.width/1000))
        this.radius=25
        this.color="blue"
    }

    /**
     * Called: At every frame
     * Do: Check if the player died or if the enemy is out of the screen then teleport him back
     */
    update(c) {
        entities.players.forEach(player => {
            if (isColliding(this,player)) {
                player.die()
            }
        })

        //Check if the enemy is not visible anymore
        if (this.x+this.radius<0 || this.y+this.radius>canvasSize.height) { 
            

            if (Math.random()>0.5) { // Vertical Attack
                this.y = (canvasSize.height/2+this.radius+Math.random()*((canvasSize.height/2)-2*this.radius));
                this.x = canvasSize.width+this.radius
                this.dx= -10-(Math.random()*(canvasSize.width/1000))
                this.dy = 0

            } else { //Horizontal Attack
                this.x = (this.radius+Math.random()*((canvasSize.width)-2*this.radius));
                this.y = 0
                this.dy= +10+(Math.random()*(canvasSize.height/1000))
                this.dx = 0
            }
        }   

        super.update(c)
    }
}

/**
 * Called: When the game is started or restarted
 * Do: Create and operate the points
 */
export class Point extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
        this.color = "green"
        this.x = this.radius+(Math.random()*(canvasSize.width-2*this.radius))
        this.y = this.radius+(Math.random()*(canvasSize.height-2*this.radius))
    }

    /**
     * Called: At every frame
     * Do: Check if the player get the point and teleport him to a random point of the screen
     */
    update(c) {
        super.update(c)

        entities.players.forEach(player => {
            if (isColliding(this,player)) {
                game.score+=1
                if (game.score>game.highscore) {
                    game.highscore = game.score
                }
                updateScoreSpan()
                this.x = this.radius+(Math.random()*(canvasSize.width-2*this.radius))
                this.y = this.radius+(Math.random()*(canvasSize.height-2*this.radius))
            }
        })

    }
}

/**
 * Called: When the game is started/restarted
 * Do: Create the player circle
 */
export class Player extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
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
        if (this.up & !this.down & (canvasSize.height-this.y-this.radius<30)) {
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
    update(c) {
        this.keyboardMoviment()
        
        //Makes the player tend to be stand still
        if (this.dx>0) {
            this.dx-=1
        } else if (this.dx<0) {
            this.dx+=1
        }

        //Bounces if touch a horizontal edge
        if (this.x+this.radius+this.dx>canvasSize.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        //Bounces if touch a vertical edge
        if (this.y+this.radius+this.dy>canvasSize.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy * this.friction
        } else {
            this.dy+=this.gravity
        }

        super.update(c)
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