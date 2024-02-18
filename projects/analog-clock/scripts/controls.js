export var time =  new Date();
export var timeDirection=1
export var timeSpeed =1
export var intervalSpeed = 1000
import { clockWork, updateTimeSpeed } from "./script.js";
export var interval = setInterval(clockWork,1000)

/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
document.querySelector("span#fast_rewind").addEventListener("click",fast_rewind)
function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
document.querySelector("span#pause").addEventListener("click",pause)
function pause() {
    timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
document.querySelector("span#play").addEventListener("click",play)
function play() {
    timeSpeed=1
    timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
document.querySelector("span#backward").addEventListener("click",backward)
function backward() {
    timeDirection=-1
    timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
document.querySelector("span#accelerate").addEventListener("click",accelerate)
function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}