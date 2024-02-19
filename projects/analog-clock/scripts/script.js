/**
Clock Second = seconds of the digital/analog clocks, if you accelerate them the clock-seconds will pass faster
VH = Viewport Height, the weight of the screen basically
 */

import { time, timeDirection, timeSpeed } from "./controls.js";

import { setNumbersPosition, addMinuteBar, rotatePointers } from "./analog_clock.js";
import { updateDigitalClock} from "./digital_clock.js"


setNumbersPosition((0.19*500), 12)
addMinuteBar((0.22*500), 60)

/**
 * Called: at every clock second (if you speed the clock you speed the time)
 * Do: change the time of the analog clock and of the digital clock
 */
export function clockWork() {
    updateTime()
    rotatePointers()
    updateDigitalClock()
}

//Methods
/**
 * Called: At every clock second
 * Do: Calculate the new time based on the currently time and on the timeDirection and timeSpeed
 */
function updateTime() {
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    //Time Run
    if (timeSpeed!=0) {
        if (timeSpeed>250) {
            time.setSeconds(seconds + timeDirection * (timeSpeed-250));
        } else {
            time.setSeconds(seconds + timeDirection);
        }
    }
}