//Global Variables
export var entities = {
    enemys : [],
    players : [],
    points : []
}

import { canvasSize, game, updateScoreSpan } from "./game.js"
import { showDeathMessage } from "./script.js"
import { addKeyListener, addTouchListener } from "./controls.js"
import { random } from "./util.js"

/**
 * @Called: [Abstract] When a child is created (Player/Point/Enemy)
 * @Do: Create the circle generic model
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
     * @Called: When the circle updates
     * @Do: Draw a circle using this.x, this.y, this.radius, this.color
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
     * @Called: When a child needs a generic update
     * @Do: Change the position then redraw
     * @param {canvasSizeRenderingContext2D} c context to be drawn
     */
    update(c) {
        if (c) {
            this.x+=this.dx
            this.y+=this.dy
            this.draw(c);
        } else {
            console.log("Undefined context")
        }
    }

}

/**
 * @Called: When the game is started/restarted
 * @Do: Create and operate the enemies
 */
export class Enemy extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
        this.x = canvasSize.width+this.radius
        this.y = random(this.radius,canvasSize.height-2*this.radius)
        this.dy= random(-5,canvasSize.height/1000)
        this.radius=25
        this.color="blue"
    }

    /**
     * @Called: At every frame
     * @Do: Check if the player died or if the enemy is out of the screen then teleport him back
     */
    update(c) {
        entities.players.forEach(player => {
            if (isColliding(this,player)) {
                game.alive = false
                showDeathMessage()
            }
        })

        //Check if the enemy is not visible anymore
        if (this.x+this.radius<0 || this.y+this.radius>canvasSize.height) { 
            

            if (Math.random()>0.5) { // Vertical Attack
                this.y = random(this.radius,canvasSize.height-2*this.radius)
                this.x = canvasSize.width+this.radius
                this.dy= random(-5,canvasSize.height/1000)
                this.dy = 0

            } else { //Horizontal Attack
                this.x = random(this.radius,canvasSize.width-2*this.radius)
                this.y = 0
                this.dy= random(5,canvasSize.height/1000)
                this.dx = 0
            }
        }   

        super.update(c)
    }
}

/**
 * @Called: When the game is started or restarted
 * @Do: Create and operate the points
 */
export class Point extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
        this.color = "green"
        this.x = random(this.radius,canvasSize.width-2*this.radius)
        this.y = random(this.radius,canvasSize.height-2*this.radius)
    }

    /**
     * @Called: At every frame
     * @Do: Check if the player get the point and teleport him to a random point of the screen
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
                this.x = random(this.radius,canvasSize.width-2*this.radius)
                this.y = random(this.radius,canvasSize.height-2*this.radius)
            }
        })

    }
}

/**
 * @Called: When the game is started/restarted
 * @Do: Create the player circle
 */
export class Player extends Circle {
    constructor(x, y, radius) {
        super(x, y, radius)
        this.color="red"
        this.maxSpeed = 30
        addKeyListener().subscribe(this.keyhandler.bind(this))
        addTouchListener().subscribe(this.touchhandler.bind(this))
        this.direction = true
        this.event = undefined
        this.up = false
        this.left = false
        this.right=false
        this.down=false
    }

    /**
     * @Called: When the keylistener call (keyup/keydown)
     * @Do: change the up/left/right/down attributes based on the keyevent
     * @param {Object} event the movement
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
     * @Called: When the touchlistener call (touchmove/touchstart)
     * @Do: change the up/left/right/down attributes based on the keyevent
     * @param {Object} event the movement
     */
    touchhandler(event) {
        if (event.type == "touchstart") {
            this.event = event
        }
        let startPos = {x: this.event.touches[0].clientX,
             y: this.event.touches[0].clientY }

        let currentlyPos = {x: event.touches[0].clientX,
            y: event.touches[0].clientY }

        let differPos = {x:(startPos.x - currentlyPos.x),
            y:(startPos.y - currentlyPos.y)}

        this.dy = -differPos.y/this.speed
        this.dx = -differPos.x/this.speed

    }

    /**
     * @Called: When the player updates
     * @Do: 
     */
    keyboardMoviment() {
        if (canvasSize.height-this.y-this.radius<30) {
            let l = 1
            if (this.up & !this.down) {
                l = 7
            }
            this.dy = direction(this.up, this.down, this.speed*l, this.dy, this.maxSpeed)
        }

        this.dx = direction(this.left, this.right, this.speed, this.dx, this.maxSpeed)
    }

    /**
     * @Called: At every frame
     * @Do: Change the position based on the speed
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
}

/**
 * @Called: When a enemy or a point updates
 * @Do: Check if the circle1 (enemy/point) is colling with the circle2 (player)
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
 * @Called When the player moves
 * @Do Calculate the dx and dy
 * @param {Number} direction the direction being tested
 * @param {Number} oposite   the oposite direction
 * @param {Number} speed     the currently speed of the ball
 * @param {Number} directionSpeed the directional speed of the ball
 * @param {Number} maxSpeed the max speed of the ball
 * @returns the direction vector
 */
function direction(direction, oposite, speed ,directionSpeed ,maxSpeed) {
    if (direction & !oposite & (directionSpeed>-maxSpeed)) {
        directionSpeed-=speed/2
    } else if (!direction & oposite & (directionSpeed<maxSpeed)) {
        directionSpeed+=speed/2
    }
    return directionSpeed
}