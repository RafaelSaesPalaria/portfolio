import { intervalSpeed ,update } from "./script.js";
import { formatNumber } from "./util.js";
import { timeSpeed, timeDirection, time, addButtonListener } from "./controls.js";

var digitalclock = document.querySelector("div#digital-clock")
var timed = document.querySelector("span#time");
var times = document.querySelector("span#timespeed")
var players = document.querySelectorAll("div#player span")

var digital_clock = {
    mainColor: "white",
    secondColor: "black",
    maxChangeSpeed:100,
    nightMin:18,
    nightMax:6
}

/**
 * Called: At every clock-second
 * Do: Update the time in the digital clock
 */
export function updateDigitalClock() {
    let hours = formatNumber(time.getHours(),2)
    let minutes = formatNumber(time.getMinutes(), 2)
    let seconds = formatNumber(time.getSeconds(), 2)
    
    timed.innerText = `${hours}:${minutes}:${seconds}`;
    daynightmodePlayer()
}

/**
 * Called: When the application accelerate or dessacelerate
 * Do: change the timespeed and indicates it in the screen
 */
addButtonListener().subscribe(updateTimeSpeed)
export function updateTimeSpeed() {
    setInterval(update,intervalSpeed/timeSpeed);
    document.querySelector("span#timespeed").innerText = `${timeDirection*timeSpeed.toFixed(2)+"x"}`
}

/**
 * ERROR/TODO: add the shadow in the oposite direction of the sun
 * Called: when the digital clock changes
 * Do: change the player from lightmode to nightmode when needed
 */
export function daynightmodePlayer() {

    let mainColor = digital_clock.mainColor
    let secondColor = digital_clock.secondColor

    if ( isNight() &
      timeSpeed<=digital_clock.maxChangeSpeed) {

        let aux = mainColor;
        mainColor = secondColor
        secondColor = aux
    }

    contrast(timed, mainColor, secondColor)
    contrast(times, mainColor, secondColor)
    contrast(digitalclock, mainColor, secondColor)
    players.forEach(player => {
        contrast(player, mainColor, secondColor)
    })
}

/**
 * Called: When the player need to know if it changes its colors
 * Do: say if it's night
 * @returns true if is night, false if it isn't
 */
function isNight() {
    if (time.getHours()<digital_clock.nightMax ||
    time.getHours()>=digital_clock.nightMin) {
        return true
    }
    return false
}

/**
 * Called: When the player style changes
 * Do: Contrast the main color in the second color of the element
 * @param {Element} element element to be contrasted
 * @param {String} mainColor     main color to be used in the element
 * @param {String} secondColor second color to be used in the element
 */
function contrast(element, mainColor, secondColor) {
    element.style.background = mainColor
    element.style.borderColor = secondColor
    element.style.color = secondColor
}