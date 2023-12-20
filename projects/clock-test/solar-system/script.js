var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

function createStars() {
    for (let i=0;i<100;i++) {
        let x=Math.random()*canvas.width
        let y=Math.random()*canvas.height
        createStar(x,y)
    }
}

function createStar(x,y) {
    c.beginPath()
    c.fillStyle = "white"
    c.arc(x,y,1,0,Math.PI*2,false)
    c.fill()
    c.closePath()
}

createStars()