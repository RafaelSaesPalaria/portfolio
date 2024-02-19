export var timeData = {
    time: new Date(),
    timeDirection:1,
    timeSpeed:1,
}

import { rotatePointers } from "./analog_clock.js";
import { updateDigitalClock } from "./digital_clock.js";

/**
 * Called: at every clock second (if you speed the clock you speed the time)
 * Do: change the time of the analog clock and of the digital clock
 */
export function clockWork() {
    updateTime()
    rotatePointers()
    updateDigitalClock()
}

/**
 * Called: At every clock second
 * Do: Calculate the new time based on the currently time and on the timeDirection and timeSpeed
 */
function updateTime() {
    let seconds = timeData.time.getSeconds();
    let minutes = timeData.time.getMinutes();
    let hours = timeData.time.getHours();

    //Time Run
    if (timeData.timeSpeed!=0) {
        if (timeData.timeSpeed>250) {
            timeData.time.setSeconds(seconds + timeData.timeDirection * (timeData.timeSpeed-250));
        } else {
            timeData.time.setSeconds(seconds + timeData.timeDirection);
        }
    }
}