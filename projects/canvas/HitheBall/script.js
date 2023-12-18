var level = document.querySelector("canvas")
level.width = innerWidth*0.95
level.height= innerHeight*0.7

var c = level.getContext("2d")

function Circle(x,y,dx,dy,radius) {
    this.x = x
    this.y = y
    this.dx=dx
    this.dy=dy
    this.radius=radius

    this.draw = function() {
        c.beginPath()
        c.arc(x,y,radius,0,Math.PI*2,false)
        c.stroke()
        c.closePath()
    };

}

function animate() {
    c.clearRect(0,0,level.width,level.height)
    requestAnimationFrame(animate)

    cx = new Circle(100,100,10,10,100);
    cx.draw()

}

animate()