import { clockWork, timeData, resetInterval } from "./time.js";
import { updateTimeSpeed, digital_clock_elements } from "./digital_clock.js";


/**
 * @Called When the system start
 * @Do connect the html elements to its functions
 */
export function clickEmitter() {
    digital_clock_elements.controls.fast_rewind.addEventListener("click",fast_rewind)
    digital_clock_elements.controls.pause.addEventListener("click",pause)
    digital_clock_elements.controls.play.addEventListener("click",play)
    digital_clock_elements.controls.backward.addEventListener("click",backward)
    digital_clock_elements.controls.accelerate.addEventListener("click",accelerate)
}

/**
 * @Called: When the fast_rewind button is pressed
 * @Do: fast_rewind the interval
 */
function fast_rewind() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=-1;
    timeData.timeSpeed*=1.1;
    resetInterval()
    updateTimeSpeed()
}

/**
 * @Called: When the pause button is pressed
 * @Do: Pause the interval
 */
function pause() {
    timeData.timeSpeed=0
    updateTimeSpeed()
}

/**
 * @Called: When the play button is pressed
 * @Do: restart the time speed
 */
function play() {
    timeData.timeSpeed=1
    timeData.timeDirection=1
    updateTimeSpeed()
}

/**
 * @Called: When the backward button is pressed
 * @Do: Go back in time
 */
function backward() {
    timeData.timeDirection=-1
    timeData.timeSpeed=1
    updateTimeSpeed()
}

/**
 * @Called: When the accelarate button is pressed
 * @Do: Accelerate the interval
 */
function accelerate() {
    if (timeData.timeSpeed==0) {timeData.timeSpeed=1}
    timeData.timeDirection=1;
    timeData.timeSpeed*=1.1;
    resetInterval()
    updateTimeSpeed()
}