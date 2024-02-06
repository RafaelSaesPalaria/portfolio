//Global Attributes
export var intervalSpeed = 1000
var degree = 0

var vh = 0

var sun = document.querySelector("div#sun")
var moon = document.querySelector("div#moon")

import { timeSpeed, timeDirection, time} from "./controls.js"
import { updateDigitalClock } from "./digital_clock.js"
import { parseAngle, getCardinalCoordinates } from "./util.js"

//Constructor
/**
 * ERROR/TODO: Update when start
 * Called: When the application start
 * Do: Set the resize/update function
 */
addEventListener("resize", resize)
start()
setInterval(update,intervalSpeed)
function start() {
    
    resize()
    window.addEventListener('zoom', resize);
}

/**
 * Called: When the program start and at every clock-second
 * Do: Updates the system
 */
export function update() {
    updateTime();
    updateDigitalClock();
    updateStar(sun, 0, vh*0.7)
    updateStar(moon, 180, vh*0.6)
    updateBackground();
}

/**
 * Called: When the application is zoomed
 * Do: Resize the screen
 */
function resize() {
    //vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    vh = 500
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
                        
    degree = parseAngle(dayTime_inSeconds,(24*60*60))   
    return degree;
}

/**
 * Called: when the angle is defined
 * Do: get the time.hours minuts and seconds and convert it all into seconds
 * @returns the daytime in seconds
 */
function get_dayTime_inSeconds() {
    return (time.getHours()*3600) + (time.getMinutes()*60) + time.getSeconds()
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
    let cardinal = getCardinalCoordinates((deg+degPlus%360),radius)
    star.style.top = `calc(100% + ${cardinal[0]}px)`
    star.style.left = `calc(50% + ${cardinal[1]}px)`
}

/**
 * Called: At every clock-second
 * Do: Update the background
 */
function updateBackground() {
    let body = document.body;
    let sun = document.querySelector("div#sun");

    let sun_x = sun.getBoundingClientRect().left+35; //70 is the sun width
    let sun_y = sun.getBoundingClientRect().top+35;

        body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange 10%, lightblue 35%, blue 95%)`
}