//Global Attributes

import { updateStar, updateBackground, stars } from "./star.js";

export var intervalSpeed = 1000
var degree = 0

import { updateDigitalClock } from "./digital_clock.js"
import { parseAngle, max } from "./util.js";
import { updateTime } from "./time.js";

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
        (timeData.time.getHours()*(max.seconds*max.minutes)) +
        (timeData.time.getMinutes()*max.seconds) +
        timeData.time.getSeconds()
    )
}

