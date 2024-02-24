import { clockWork, timeData } from "./time.js";
import { updateTimeSpeed } from "./digital_clock.js";
export var interval = setInterval(clockWork,1000)
var intervalSpeed = 1000

clockWork()

document.querySelector("span#fast_rewind").addEventListener("click",fast_rewind)
document.querySelector("span#pause").addEventListener("click",pause)
document.querySelector("span#play").addEventListener("click",play)
document.querySelector("span#backward").addEventListener("click",backward)
document.querySelector("span#accelerate").addEventListener("click",accelerate)

/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
function fast_rewind() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=-1;
    timeData.timeSpeed*=1.1;
    resetInterval()
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
function pause() {
    timeData.timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
function play() {
    timeData.timeSpeed=1
    timeData.timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
function backward() {
    timeData.timeDirection=-1
    timeData.timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
function accelerate() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=1;
    timeData.timeSpeed*=1.1;
    resetInterval()
    updateTimeSpeed()
}

/**
 * Called: When the speed changes (accelerate/dissacelerate)
 * Do: Reset the clock speed to the new speed
 */
function resetInterval() {
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeData.timeSpeed);
}