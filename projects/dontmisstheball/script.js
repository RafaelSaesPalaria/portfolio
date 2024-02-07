//Global Attributes
var level = document.querySelector("canvas")
level.width = innerWidth*0.95
level.height= innerHeight*0.7

var c = level.getContext("2d")

var score = 0
var redcount = 0

var mouse = {
    x:undefined,
    y:undefined,
    clickCount:0
}

var circleArray = []

/**
 * When: The screen resizes
 * Do: Resizes the canvas
 */
window.addEventListener("resize",function() {
    level.width = this.innerWidth*0.95
    level.height=this.innerHeight*0.7
    init()
})

/**
 * When: The mouse is pressed
 * Do: execute the mouseClick function which change the mouseObj position and clickCount
 */
window.addEventListener("mousedown",function(event) {
   mouseClick(event)
})

/**
 * When: Someone press his fingers
 * Do: execute the mouseClick function which change the mouseObj position and clickCount
 */
window.addEventListener("touchstart",function(event) {
    mouseClick(event)
})

/**
 * When: The mouse is pressed
 * Do: change the mouseObj position and update the click points / score
 * @param {Object} event 
 */
function mouseClick(event) {
    if ((event.clientX>level.offsetLeft & event.clientX<level.offsetLeft+level.width) &
        (event.clientY>level.offsetTop & event.clientY<level.offsetTop+level.width)) {
        mouse.x = event.clientX - level.offsetLeft
        mouse.y = event.clientY - level.offsetTop
        mouse.clickCount+=1
        updateScore()
    }
}

/**
 * When: The game start/restart
 * Do: Create and operate the circle obj
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} dx 
 * @param {Number} dy 
 * @param {Number} radius 
 * @param {String} color 
 * @param {Number} points 
 */
function Circle(x,y,dx,dy,radius,color,points) {
    this.x = x
    this.y = y
    this.dx=dx
    this.dy=dy
    this.radius=radius
    this.color=color
    this.points=points

    /**
     * When: The obj update
     * Do: draw the circle
     */
    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    };

    /**
     * When: at every frame
     * Do: 
     */
    this.update = function() {

        //Check if the mouse click on the obj
        if ((mouse.x - (this.x) - this.dx< this.radius & mouse.x - (this.x) + this.dx>-this.radius)&
        (mouse.y - (this.y) - this.dy < this.radius & mouse.y - (this.y) + this.dy>-this.radius)) {

            //Consider this a red circle if the points it gave are 3
            if (this.points==3) {
                redcount-=1
            }

            //Finish the game if all the redpoints was been clicked
            if (redcount==0) {
                end()
            }

            //Update score and remove the circle of the screen
            score+=this.points
            updateScore()
            let indexOfCircle =circleArray.indexOf(this)
            if (indexOfCircle !== -1) {
                circleArray.splice(indexOfCircle, 1);
            }
        }

        //Check if the obj is hitting a horizontal border
        if (this.x+this.radius+this.dx>level.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        //Check if the obj is hitting a vertical border
        if (this.y+this.radius+this.dy>level.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy
        }

        //Move the obj position and redraw it
        this.x+=this.dx
        this.y+=this.dy
        this.draw()
    }

    /**
     * When: When the game start
     * Do: Give the ball the red preset
     */
    this.setRed = function() {
        this.points = 3
        this.color = "red"
        this.radius*=0.7
        this.dx*=1.2
        this.dy*=1.2
    }

    /**
     * When: The game is generating red balls and want to see if this is one of them
     * Do: Return the color of the ball
     * @returns 
     */
    this.isRed = function() {
        return this.color=="red"
    }

}

/**
 * When: when the mouse click or when a circle is clicked (two different calls)
 * Do: update the score and the click on the scoreboard
 */
function updateScore() {
    var scoreboard = document.querySelector("#scoreboard");
    if (scoreboard) {
        scoreboard.innerText = `Score: ${score}\nClicks: ${mouse.clickCount}\n`;/*+`Reds: ${redcount}`;*/
    } else {
        console.error("Scoreboard element not found");
    }
}

/**
 * When: A clicked circle detect that theres no more red circles
 * Do: Show the end div and calculate if you won or you lose
 */
function end() {
    document.querySelector("div#end").style.display="block"
    let points = document.querySelector("div#end span#points")
    let point = score*100/mouse.clickCount
    points.innerText = `Points: ${(point.toFixed(0))}\n`

    let result = document.querySelector("div#end span#result")
    if (score>0) {
        result.innerText = `YOU WON\n`
    } else {
        result.innerText= `YOU LOST\n`
    }
}

/**
 * When: The script start or when the screen is resized
 * Do: Start the game
 */
function init() {
    document.querySelector("div#end").style.display = "none"

    circleArray = []
    redcount=0
    clickCount=0
    score=0
    let levelArea = level.width*level.height

    //Generate the blue balls
   generateBlueCircles(levelArea/5000)

    //Turns some of blue balls into red balls
    let redPercentage = 20
    addRedCircles(redPercentage)

}

/**
 * When: The game start/restart
 * Do: Generate the blue balls
 * @param {Number} blueTotal the total of blue balls to be added
 */
function generateBlueCircles(blueTotal) {
    for (let i=0;i<blueTotal;i++) {
        let radius = 20
        let x = radius+Math.random()*(level.width-2*radius)
        let y = radius+Math.random()*(level.height-2*radius)
        let dx = (Math.random() - 0.5)* 5
        let dy = (Math.random() - 0.5)* 5
        let points = -1

        let color = "blue"

        let circle = new Circle(x,y,dx,dy,radius,color,points);
        circleArray.push(circle)
    }
}

/**
 * When: The game start/restart
 * Do: Turns some of blue balls into red balls
 * @param {Number} redPercentage 
 */
function addRedCircles(redPercentage) {
    for (redcount=0; redcount<circleArray.length/100*redPercentage;redcount++) {
        let i = Math.floor(Math.random()*circleArray.length)
        if (circleArray[i].isRed()) {
            redcount-=1
        }
        circleArray[i].setRed()
    }
}

/**
 * When: At every frame since the start of the game
 * Do: Update the screen, the circles and the mouse position
 */
function animate() {
    c.clearRect(0,0,level.width,level.height)
    requestAnimationFrame(animate)

    circleArray.forEach(circle => {
        circle.update()
    })
    
    //Show where the player clicked [Dev tool]
    /*let mouseC = new Circle(mouse.x,mouse.y,0,0,3,"yellow")
    circleArray.push(mouseC)*/
    
    mouse.x = undefined
    mouse.y = undefined

}

init()
animate()