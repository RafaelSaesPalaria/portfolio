import { level, mouse, updateScore, end } from "./script.js"

/**
 * @When : The game start/restart
 * @Do : Create and operate the circle obj
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} dx 
 * @param {Number} dy 
 * @param {Number} radius 
 * @param {String} color 
 * @param {Number} points 
 */
export function Circle(x,y,dx,dy,radius,color,points) {
    this.x = x
    this.y = y
    this.dx=dx
    this.dy=dy
    this.radius=radius
    this.color=color
    this.points=points

    /**
     * @When : The obj update
     * @Do : draw the circle
     */
    this.draw = function() {
        level.c.beginPath()
        level.c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        level.c.fillStyle = this.color
        level.c.fill()
        level.c.stroke()
        level.c.closePath()
    };

    /**
     * @When : at every frame
     * @Do : 
     */
    this.update = function() {

        //Check if the mouse click on the obj
        if ((mouse.x - (this.x) - this.dx< this.radius & mouse.x - (this.x) + this.dx>-this.radius)&
        (mouse.y - (this.y) - this.dy < this.radius & mouse.y - (this.y) + this.dy>-this.radius)) {

            //Consider this a red circle if the points it gave are 3
            if (this.points==3) {
                level.redcount-=1
            }

            //Finish the game if all the redpoints was been clicked
            if (level.redcount==0) {
                end()
            }

            //Update score and remove the circle of the screen
            level.score+=this.points
            updateScore()
            let indexOfCircle =level.circleArray.indexOf(this)
            if (indexOfCircle !== -1) {
                level.circleArray.splice(indexOfCircle, 1);
            }
        }

        //Check if the obj is hitting a horizontal border
        if (this.x+this.radius+this.dx>level.canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        //Check if the obj is hitting a vertical border
        if (this.y+this.radius+this.dy>level.canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy
        }

        //Move the obj position and redraw it
        this.x+=this.dx
        this.y+=this.dy
        this.draw()
    }

    /**
     * @When the game start
     * @Do Give the ball the red preset
     */
    this.setRed = function() {
        this.points = 3
        this.color = "red"
        this.radius*=0.7
        this.dx*=1.2
        this.dy*=1.2
    }

    /**
     * @When The game is generating red balls and want to see if this is one of them
     * @Do Return the color of the ball
     * @returns 
     */
    this.isRed = function() {
        return this.color=="red"
    }

}