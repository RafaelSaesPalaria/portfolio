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

/**
 * Called: When the pointers rotate
 * Do: Get the time type in seconds precision
 * @param {Number} type the type of the time [3 = Hours, 2 = Minutes, 1 = Seconds]
 * @returns the time in the type
 */
export function getTime(type) {
    let time = [
        timeData.time.getSeconds(),
        timeData.time.getMinutes(),
        timeData.time.getHours()]
    let totalTime=0
    for (let i=0; i<type;i++) {
        totalTime/=60
        totalTime+=time[i]
    }
    return totalTime
}