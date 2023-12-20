var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

var farawayStars = []
function createFarawayStars() {
    for (let i=0;i<100;i++) {
        let x=Math.random()*canvas.width
        let y=Math.random()*canvas.height
        let star = {x,y}
        farawayStars.push(star)
    }
}

var closeStars = []
function createCloseStars() {
    let x = canvas.width/2
    let y =canvas.height/2
    let radius = 40
    let color = "yellow"
    let star = {x,y,radius,color}
    closeStars.push(star)
}

function drawStar(x,y,radius,color) {
    c.beginPath()
    c.fillStyle = color
    c.arc(x,y,radius,0,Math.PI*2,false)
    c.fill()
    c.closePath()
}

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)

    farawayStars.forEach(star => {
        drawStar(star.x, star.y, 1, "white")
    })

    closeStars.forEach(star => {
        drawStar(star.x,star.y,star.radius,star.color)
    })
}

createFarawayStars()
createCloseStars()
animate()