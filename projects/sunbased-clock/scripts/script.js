//Global Attributes
export var intervalSpeed = 1000
var degree = 0

var stars = {
    sun: {
        element: document.querySelector("div#sun"),
        degPlus: 90,
        distance: 350
    },
    moon: {
        element: document.querySelector("div#moon"),
        degPlus: 270,
        distance: 300
    }
}

const maxSeconds = 60
const maxMinutes = 60
const maxHours = 24

import { timeSpeed, timeDirection, time} from "./controls.js"
import { updateDigitalClock } from "./digital_clock.js"
import { parseAngle, getCardinalCoordinates, maxDegree } from "./util.js"

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
function getAngle() {
    let dayTime_inSeconds = get_dayTime_inSeconds()
                        
    degree = parseAngle(dayTime_inSeconds,(maxHours*maxMinutes*maxSeconds))   
    return degree;
}

/**
 * Called: when the angle is defined
 * Do: get the time.hours minuts and seconds and convert it all into seconds
 * @returns the daytime in seconds
 */
function get_dayTime_inSeconds() {
    return (
        (time.getHours()*(maxSeconds*maxMinutes)) +
        (time.getMinutes()*maxSeconds) +
        time.getSeconds()
    )
}

/**
 * Called: at every clock-second
 * Do: move the star to the currently time-location
 * @param {Object}   star        the star that's gonna be moved      
 * @param {Number} degPlus the plus factor in the degree calc 
 * @param {Number} radius    the distance of the star from the center of the orbit
 */
function updateStar(star, degPlus, radius) {
    let deg = getAngle();
    let cardinal = getCardinalCoordinates((deg+degPlus)%maxDegree,radius)
    star.style.top = `calc(100% + ${cardinal.x}px)`
    star.style.left = `calc(50% + ${cardinal.y}px)`
}

/**
 * Called: At every clock-second
 * Do: Update the background
 */
function updateBackground() {
    let sun = stars.sun.element;

    let sun_x = sun.getBoundingClientRect().left+sun.clientWidth/2;
    let sun_y = sun.getBoundingClientRect().top+sun.clientHeight/2;

    document.body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange 10%, lightblue 35%, blue 95%)`
}