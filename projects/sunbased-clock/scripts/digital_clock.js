import { intervalSpeed ,update } from "./script.js";
import { formatNumber } from "./util.js";
import { timeSpeed, time } from "./controls.js";

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
 * Do: change the timespeed and indicates it in the screen
 */
export function updateTimeSpeed() {
    setInterval(update,intervalSpeed/timeSpeed);
    document.querySelector("span#timespeed").innerHTML = `${timeSpeed.toFixed(2)+"x"}`
}

/**
 * ERROR/TODO: add the shadow in the oposite direction of the sun
 * Called: when the digital clock changes
 * Do: change the player from lightmode to nightmode when needed
 */
export function daynightmodePlayer() {
    let color1 = "white";
    let color2 = "black"

    if (time.getHours()>=18 || time.getHours()<6) {
        let aux = color1;
        color1 = color2
        color2 = aux
    }

    playerStyle(color1,color2)
     
}

/**
 * Called: When the digital clock change color
 * Do: Change the color of the digital clock
 * @param {String} mainColor the main color of the player
 * @param {String} secondColor the contrast color of the player
 */
function playerStyle(mainColor, secondColor) {
    let digitalclock = document.querySelector("div#digital-clock")
    let timed = document.querySelector("span#time");
    let times = document.querySelector("span#timespeed")
    let players = document.querySelectorAll("div#player span")

    digitalclock.style.background = `${mainColor}`
    digitalclock.style.borderColor = `${secondColor}`
    timed.style.color = `${secondColor}`
    times.style.color = `${secondColor}`
    players.forEach(player => {
        player.style.background = `${mainColor}`
        player.style.borderColor = `${secondColor}`
        player.style.color = `${secondColor}`
    })
}