export default class Pointer {
    constructor(c, clockLocation, width, thichness, color) {
        this.c = c
        this.x = clockLocation.x
        this.y = clockLocation.y
        this.width = width
        this.height = thichness
        this.color = color
        this.angle = 0
    }
    draw() {
        this.c.beginPath()
        this.c.fillStyle = this.color
        this.c.save()
        this.c.translate(this.x,this.y)
        this.c.rotate((this.angle+ 270) * Math.PI /180)
        this.c.fillRect(0,-this.height/2,this.width,this.height)
        this.c.restore()
        this.c.closePath()
    }
    update(angle) {
        this.angle = angle
        this.draw()
    }
}
