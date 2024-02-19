import { clockWork } from "./time.js";
import { timeData } from "./time.js";
import { updateTimeSpeed } from "./digital_clock.js";
export var interval = setInterval(clockWork,1000)
var intervalSpeed = 1000

/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
document.querySelector("span#fast_rewind").addEventListener("click",fast_rewind)
function fast_rewind() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=-1;
    timeData.timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeData.timeSpeed);
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
document.querySelector("span#pause").addEventListener("click",pause)
function pause() {
    timeData.timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
document.querySelector("span#play").addEventListener("click",play)
function play() {
    timeData.timeSpeed=1
    timeData.timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
document.querySelector("span#backward").addEventListener("click",backward)
function backward() {
    timeData.timeDirection=-1
    timeData.timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
document.querySelector("span#accelerate").addEventListener("click",accelerate)
function accelerate() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=1;
    timeData.timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeData.timeSpeed);
    updateTimeSpeed()
}