import { formattedNumbers } from "./util.js";
import {timeData} from "./time.js";

/**
 * Called: at every clock-second
 * Do: update the elements of the digital clock based on the clock-time
 */
export function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock #time");

    let hours      = formattedNumbers(timeData.time.getHours(), 2)
    let minutes  = formattedNumbers(timeData.time.getMinutes(), 2)
    let seconds = formattedNumbers( timeData.time.getSeconds(), 2)

    digital_clock.innerText = `${hours}:${minutes}:${seconds}`;
}

/**
 * Called: When the timespeed changes
 * Do: change the timespeed on the player
 */
export function updateTimeSpeed() {
    let span = document.querySelector("div#player span#timespeed")
    span.innerText=`${(timeData.timeDirection*timeData.timeSpeed).toFixed(2)}x`
}