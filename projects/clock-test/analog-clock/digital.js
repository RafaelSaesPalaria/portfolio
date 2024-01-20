export default class DigitalClock {
    constructor(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    update(c,time) {
        this.draw(c,time)
    }

    /**
     * Called:
     * Do:
     * @param {CanvasRenderingContext2D} c 
     */
    draw(c,time) {
        c.clearRect(this.x,this.y,this.w,this.h)
        
        c.beginPath()
        c.fillRect(this.x,this.y,this.w,this.h)
        c.fillText(time,this.x,this.y)
        c.closePath()
    }
}