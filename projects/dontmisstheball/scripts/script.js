//Global Attributes
export var level = {
   canvas:  document.querySelector("canvas"),
   c: document.querySelector("canvas").getContext("2d"),
   score : 0,
   redcount : 0,
   circleArray : []
}
level.canvas.width = innerWidth*0.95
level.canvas.height= innerHeight*0.7

export var mouse = {
    x:undefined,
    y:undefined,
    clickCount:0
}

/**
 * @When : The screen resizes
 * @Do : Resizes the canvas
 */
window.addEventListener("resize",function() {
    level.canvas.width = this.innerWidth*0.95
    level.canvas.height=this.innerHeight*0.7
    init()
})

/**
 * @When : The mouse is pressed
 * @Do : execute the mouseClick function which change the mouseObj position and clickCount
 */
window.addEventListener("mousedown",function(event) {
   mouseClick(event)
})

/**
 * @When : Someone press his fingers
 * @Do : execute the mouseClick function which change the mouseObj position and clickCount
 */
window.addEventListener("touchstart",function(event) {
    mouseClick(event)
})

import { Circle } from "./circle.js"

/**
 * @When : The mouse is pressed
 * @Do : change the mouseObj position and update the click points / score
 * @param {Object} event 
 */
function mouseClick(event) {
    if ((event.clientX>level.canvas.offsetLeft & event.clientX<level.canvas.offsetLeft+level.canvas.width) &
        (event.clientY>level.canvas.offsetTop & event.clientY<level.canvas.offsetTop+level.canvas.width)) {
        mouse.x = event.clientX - level.canvas.offsetLeft
        mouse.y = event.clientY - level.canvas.offsetTop
        mouse.clickCount+=1
        updateScore()
    }
}

/**
 * @When the mouse click or when a circle is clicked (two different calls)
 * @Do update the score and the click on the scoreboard
 */
export function updateScore() {
    var scoreboard = document.querySelector("#scoreboard");
    if (scoreboard) {
        scoreboard.innerText = `Score: ${level.score}\nClicks: ${mouse.clickCount}\n`;/*+`Reds: ${redcount}`;*/
    } else {
        console.error("Scoreboard element not found");
    }
}

/**
 * @When a clicked circle detect that theres no more red circles
 * @Do Show the end div and calculate if you won or you lose
 */
export function end() {
    document.querySelector("div#end").style.display="block"
    let points = document.querySelector("div#end span#points")
    let point = level.score*100/mouse.clickCount
    points.innerText = `Points: ${(point.toFixed(0))}\n`

    let result = document.querySelector("div#end span#result")
    if (level.score>0) {
        result.innerText = `YOU WON\n`
    } else {
        result.innerText= `YOU LOST\n`
    }
    document.querySelector("div#end a").addEventListener("click", init)
}

/**
 * @When The script start or when the screen is resized
 * @Do Start the game
 */
function init() {
    document.querySelector("div#end").style.display = "none"

    level.circleArray = []
    level.redcount=0
    mouse.clickCount=0
    level.score=0
    let levelArea = level.canvas.width*level.canvas.height

    //Generate the blue balls
   generateBlueCircles(levelArea/5000)

    //Turns some of blue balls into red balls
    let redPercentage = 20
    addRedCircles(redPercentage)

}

/**
 * @When The game start/restart
 * @Do Generate the blue balls
 * @param {Number} blueTotal the total of blue balls to be added
 */
function generateBlueCircles(blueTotal) {
    for (let i=0;i<blueTotal;i++) {
        let radius = 20
        let x = radius+Math.random()*(level.canvas.width-2*radius)
        let y = radius+Math.random()*(level.canvas.height-2*radius)
        let dx = (Math.random() - 0.5)* 5
        let dy = (Math.random() - 0.5)* 5
        let points = -1

        let color = "blue"

        let circle = new Circle(x,y,dx,dy,radius,color,points);
        level.circleArray.push(circle)
    }
}

/**
 * @When The game start/restart
 * @Do Turns some of blue balls into red balls
 * @param {Number} redPercentage 
 */
function addRedCircles(redPercentage) {
    for (level.redcount=0; level.redcount<level.circleArray.length/100*redPercentage;level.redcount++) {
        let i = Math.floor(Math.random()*level.circleArray.length)
        if (level.circleArray[i].isRed()) {
            level.redcount-=1
        }
        level.circleArray[i].setRed()
    }
}

/**
 * @When At every frame since the start of the game
 * @Do Update the screen, the circles and the mouse position
 */
function animate() {
    level.c.clearRect(0,0,level.canvas.width,level.canvas.height)
    requestAnimationFrame(animate)

    level.circleArray.forEach(circle => {
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