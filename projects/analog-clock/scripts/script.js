/**
Clock Second = seconds of the digital/analog clocks, if you accelerate them the clock-seconds will pass faster
VH = Viewport Height, the weight of the screen basically
 */

import { time, timeDirection, timeSpeed } from "./controls.js";
import { formattedNumbers, parseAngle, rotatePointer } from "../scripts/util.js";

import { setNumbersPosition, addMinuteBar } from "./analog_clock.js";



setNumbersPosition((0.19*500), 12)
addMinuteBar((0.22*500), 60)

/**
 * Called: at every clock second (if you speed the clock you speed the time)
 * Do: change the time of the analog clock and of the digital clock
 */
export function clockWork() {
    updateTime()
    rotatePointers()
    updateDigitalClock()
}

//Methods
/**
 * Called: When the timespeed changes
 * Do: change the timespeed on the player
 */
export function updateTimeSpeed() {
    let span = document.querySelector("div#player span#timespeed")
    span.innerText=`${timeSpeed.toFixed(2)}x`
}

/**
 * Called: At every clock second
 * Do: Calculate the new time based on the currently time and on the timeDirection and timeSpeed
 */
function updateTime() {
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    //Time Run
    if (timeSpeed!=0) {
        if (timeSpeed>250) {
            time.setSeconds(seconds + timeDirection * (timeSpeed-250));
        } else {
            time.setSeconds(seconds + timeDirection);
        }
    }
}

/**
 * Called: At every clock-second
 * Do: rotate the pointers
 */
function rotatePointers() {
    //Pointers  [0] = Hours, [1] = Minutes, [2] = Seconds
    let pointers = document.querySelectorAll("div.pointer")

    rotatePointer(pointers[0],parseAngle(time.getHours()+(time.getMinutes()/60),12)+180)
    rotatePointer(pointers[1],parseAngle(time.getMinutes()+(time.getSeconds()/60),60)+180)
    rotatePointer(pointers[2],parseAngle(time.getSeconds(),60)+180)
}

/**
 * Called: at every clock-second
 * Do: update the elements of the digital clock based on the clock-time
 */
function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock #time");

    let hours      = formattedNumbers(time.getHours(), 2)
    let minutes  = formattedNumbers(time.getMinutes(), 2)
    let seconds = formattedNumbers( time.getSeconds(), 2)

    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}
