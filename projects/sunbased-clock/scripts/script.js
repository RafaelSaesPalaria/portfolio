//Global Attributes

import { updateStar, updateBackground, stars } from "./star.js";

export var intervalSpeed = 1000
var degree = 0

import { timeSpeed, timeDirection, time} from "./controls.js"
import { updateDigitalClock } from "./digital_clock.js"
import { parseAngle, getCardinalCoordinates, max } from "./util.js"

//Constructor
/**
 * ERROR/TODO: Update when start
 * Called: When the application start
 * Do: Set the resize/update function
 */
setInterval(update,intervalSpeed)

/**
 * Called: When the program start and at every clock-second
 * Do: Updates the system
 */
export function update() {
    updateTime();
    updateDigitalClock();
    updateBackground();
    for (let star in stars) {
        updateStar(stars[star].element, stars[star].degPlus, stars[star].distance)
    }
}

//Methods
/*
* Called: Every clock-second
* Do: Update the time based on the timeDirection and in the timeSpeed
*/
function updateTime() {
    let seconds = time.getSeconds();
    time.setSeconds(seconds + timeDirection * timeSpeed);
}

/**
 * Called: When the star position is updated
 * Do: get the angle based on the time
 * @returns the degree of the angle
*/
export function getAngle() {
    let dayTime_inSeconds = get_dayTime_inSeconds()
                        
    degree = parseAngle(dayTime_inSeconds,(max.hours*max.minutes*max.seconds))   
    return degree;
}

/**
 * Called: when the angle is defined
 * Do: get the time.hours minuts and seconds and convert it all into seconds
 * @returns the daytime in seconds
 */
function get_dayTime_inSeconds() {
    return (
        (time.getHours()*(max.seconds*max.minutes)) +
        (time.getMinutes()*max.seconds) +
        time.getSeconds()
    )
}

