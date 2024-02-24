import { formattedNumbers } from "./util.js";
import {timeData} from "./time.js";

var digital_clock = {
    time: document.querySelector("div#digital-clock #time"),
    speed: document.querySelector("div#player span#timespeed")
}

/**
 * Called: at every clock-second
 * Do: update the elements of the digital clock based on the clock-time
 */
export function updateDigitalClock() {
    let hours      = formattedNumbers(timeData.time.getHours(), 2)
    let minutes  = formattedNumbers(timeData.time.getMinutes(), 2)
    let seconds = formattedNumbers( timeData.time.getSeconds(), 2)

    digital_clock.time.innerText = `${hours}:${minutes}:${seconds}`;
}

/**
 * Called: When the timespeed changes
 * Do: change the timespeed on the player
 */
export function updateTimeSpeed() {
    digital_clock.speed.innerText=`${(timeData.timeDirection*timeData.timeSpeed).toFixed(2)}x`
}