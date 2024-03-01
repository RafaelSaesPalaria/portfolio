import { intervalSpeed ,update } from "./script.js";
import { formatNumber } from "./util.js";
import { timeData } from "./time.js";
import { addButtonListener } from "./controls.js";

export var digital_clock = {
    elements: {
        digitalclock: document.querySelector("div#digital-clock"),
        timed:          document.querySelector("span#time"),
        times:          document.querySelector("span#timespeed"),

        fast_rewind:document.querySelector("div#player span#fast_rewind"),
        backward:   document.querySelector("div#player span#backward"),
        pause:         document.querySelector("div#player span#pause"),
        play:            document.querySelector("div#player span#play"),
        accelerate:  document.querySelector("div#player span#accelerate")
    },
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
    let hours = formatNumber(timeData.time.getHours(),2)
    let minutes = formatNumber(timeData.time.getMinutes(), 2)
    let seconds = formatNumber(timeData.time.getSeconds(), 2)

    digital_clock.elements.timed.innerText = `${hours}:${minutes}:${seconds}`;
    daynightmodePlayer()
}

/**
 * Called: When the application accelerate or dessacelerate
 * Do: change the timespeed and indicates it in the screen
 */
addButtonListener().subscribe(updateTimeSpeed)
export function updateTimeSpeed() {
    setInterval(update,intervalSpeed/timeData.speed);
    digital_clock.elements.times.innerText = `${timeData.direction*timeData.speed.toFixed(2)+"x"}`
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
      timeData.speed<=digital_clock.maxChangeSpeed) {

        let aux = mainColor;
        mainColor = secondColor
        secondColor = aux
        
    }
    contrastPlayer(mainColor,secondColor)
}

/**
 * Called: When the player style changes
 * Do: Contrast the main color in the second color of the player
 * @param {String} mainColor main color to be used in the elements
 * @param {String} secondColor second color to be used in the element
 */
function contrastPlayer(mainColor, secondColor) {
    for (var element in digital_clock.elements) {
        contrast(digital_clock.elements[element], mainColor, secondColor)
    }
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

/**
 * Called: When the player need to know if it changes its colors
 * Do: say if it's night
 * @returns true if is night, false if it isn't
 */
function isNight() {
    if (timeData.time.getHours()<digital_clock.nightMax ||
    timeData.time.getHours()>=digital_clock.nightMin) {
        return true
    }
    return false
}