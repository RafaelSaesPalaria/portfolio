import { updateTimeSpeed } from "./digital_clock.js";
export var timeDirection = 1
export var timeSpeed     = 1
export var time = new Date();


/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
export function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
export function pause() {
    timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
export function play() {
    timeSpeed=1
    timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
export function backward() {
    timeDirection=-1
    timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelerate button is pressed
 * Do: Accelerate the interval
 */
export function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
    updateTimeSpeed()
    console.log(time)
}