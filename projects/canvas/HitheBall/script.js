var level = document.querySelector("canvas")
level.width = innerWidth*0.95
level.height= innerHeight*0.7

var c = level.getContext("2d")

var score = 0

var mouse = {
    x:undefined,
    y:undefined
}
window.addEventListener("resize",function() {
    level.width = this.innerWidth*0.95
    level.height=this.innerHeight*0.7
    init()
})
window.addEventListener("mousedown",function(event) {
    console.log(event)
    if ((event.clientX>level.offsetLeft & event.clientX<level.offsetLeft+level.width) &
        (event.clientY>level.offsetTop & event.clientY<level.offsetTop+level.width)) {
        mouse.x = event.clientX - level.offsetLeft
        mouse.y = event.clientY - level.offsetTop
    }
})

window.addEventListener("touchstart",function(event) {
    mouse.x = event.x 
    mouse.y = event.y
})



function Circle(x,y,dx,dy,radius,color,points) {
    this.x = x
    this.y = y
    this.dx=dx
    this.dy=dy
    this.radius=radius
    this.color=color
    this.points=points

    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    };

    this.update = function() {

        if ((mouse.x - (this.x) < this.radius & mouse.x - (this.x) >-this.radius)&
        (mouse.y - (this.y) < this.radius & mouse.y - (this.y) >-this.radius)) {
            score+=this.points
            updateScore()
            let indexOfCircle =circleArray.indexOf(this)
            if (indexOfCircle !== -1) {
                circleArray.splice(indexOfCircle, 1);
            }
        }

        if (this.x+this.radius+this.dx>level.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx
        }

        if (this.y+this.radius+this.dy>level.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy
        }

        this.x+=this.dx
        this.y+=this.dy
        this.draw()
    }

    this.setRed = function() {
        this.points = 3
        this.color = "red"
        this.radius*=0.7
        this.dx*=1.2
        this.dy*=1.2
    }

}

function updateScore() {
    var scoreboard = document.querySelector("#scoreboard");
    if (scoreboard) {
        scoreboard.innerText = `Score: ${score}`;
    } else {
        console.error("Scoreboard element not found");
    }
}

var circleArray = []
function init() {
    circleArray = []
    for (let i=0;i<50;i++) {
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

    let redPercentage = 20
    for (let qnt=0; qnt<circleArray.length/100*redPercentage;qnt++) {
        let i = Math.floor(Math.random()*circleArray.length)
        circleArray[i].setRed()
    }

}

function animate() {
    c.clearRect(0,0,level.width,level.height)
    requestAnimationFrame(animate)

    circleArray.forEach(circle => {
        circle.update()
    })
    
    /*let mouseC = new Circle(mouse.x,mouse.y,0,0,3,"yellow") // DEV MOUSEPOINT VIEW
    circleArray.push(mouseC)*/
    
    mouse.x = undefined
    mouse.y = undefined

}

init()
animate()