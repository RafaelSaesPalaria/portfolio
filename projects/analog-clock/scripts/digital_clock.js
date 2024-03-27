import { formattedNumbers } from "./util.js";
import {timeData} from "./time.js";

export var digital_clock_elements = {
    time: document.querySelector("div#digital-clock #time"),
    speed: document.querySelector("div#player span#timespeed"),
    controls: {
        fast_rewind: document.querySelector("span#fast_rewind"),
        pause: document.querySelector("span#pause"),
        play: document.querySelector("span#play"),
        backward: document.querySelector("span#backward"),
        accelerate: document.querySelector("span#accelerate"),
    }
}

/**
 * @Called at every clock-second
 * @Do update the elements of the digital clock based on the clock-time
 */
export function updateDigitalClock() {
    let hours      = formattedNumbers(timeData.time.getHours(), 2)
    let minutes  = formattedNumbers(timeData.time.getMinutes(), 2)
    let seconds = formattedNumbers( timeData.time.getSeconds(), 2)

    digital_clock_elements.time.innerText = `${hours}:${minutes}:${seconds}`;
}

/**
 * @Called When the timespeed changes
 * @Do change the timespeed on the player
 */
export function updateTimeSpeed() {
    digital_clock_elements.speed.innerText=`${(timeData.timeDirection*timeData.timeSpeed).toFixed(2)}x`
}