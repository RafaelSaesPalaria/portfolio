import { time, timeSpeed } from "./script.js";
import { formatNumber } from "./util.js";

/**
 * Called: At every clock-second
 * Do: Update the time in the digital clock
 */
export function updateDigitalClock() {
    let digital_clock = document.querySelector("span#time");

    let hours = formatNumber(time.getHours(),2)
    let minutes = formatNumber(time.getMinutes(), 2)
    let seconds = formatNumber(time.getSeconds(), 2)
    
    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
    daynightmodePlayer()
}

/**
 * Called: When the application accelerate or dessacelerate
 * Do: change the timespeed indicator in the screen
 */
export function updateTimeSpeed() {
    document.querySelector("span#timespeed").innerHTML = `${timeSpeed.toFixed(2)+"x"}`
}

/**
 * ERROR/TODO: add the shadow in the oposite direction of the sun
 * Called: when the digital clock changes
 * Do: change the player from lightmode to nightmode when needed
 */
export function daynightmodePlayer() {
    let digitalclock = document.querySelector("div#digital-clock")
    let timed = document.querySelector("span#time");
    let times = document.querySelector("span#timespeed")
    let players = document.querySelectorAll("div#player span")
    let color1 = "white";
    let color2 = "black"

    if (time.getHours()>=18 || time.getHours()<6) {
        let aux = color1;
        color1 = color2
        color2 = aux
    }

    digitalclock.style.background = `${color1}`
    digitalclock.style.borderColor = `${color2}`
    timed.style.color = `${color2}`
    times.style.color = `${color2}`
    players.forEach(player => {
        player.style.background = `${color1}`
        player.style.borderColor = `${color2}`
        player.style.color = `${color2}`
    }) 
}