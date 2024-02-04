//Global Attributes
export var time = new Date();
var timeDirection = 1
export var timeSpeed     = 1
var intervalSpeed = 1000
var degree = 0

var vh = 0

var sun = document.querySelector("div#sun")
var moon = document.querySelector("div#moon")

import { updateDigitalClock, updateTimeSpeed } from "./digital_clock.js"

//Constructor
/**
 * Called: When the application start
 * Do: Set the resize/update function
 */
addEventListener("resize", resize)
start()
setInterval(update,intervalSpeed)
function start() {
    resize()
    window.addEventListener('zoom', resize);
    update()
}

/**
 * Called: When the program start and at every clock-second
 * Do: Updates the system
 */
function update() {
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
//Controls
/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
export function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
export function pause() {
    timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
export function play() {
    timeSpeed=1
    timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
export function backward() {
    timeDirection=-1
    timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
export function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}

/*
* Called: Every clock-second
* Do: Update the time based on the timeDirection and in the timeSpeed
*/
function updateTime() {
    let seconds = time.getSeconds();
    time.setSeconds(seconds + timeDirection * timeSpeed);
}

/**
 * Called: When the digital clock updates
 * Do: Format a number to have a certain length
 * @param {Number} number the unformatted number
 * @param {Number} length   the desired length
 * @returns the formatted number
 */
export function formatNumber(number ,length) {
    let string = ""
    for (let i = number.toString().length; i<length; i++) {
        string+="0"
    }
    number = string+number.toString()
    return number
}

/**
 * Called: When the angle of a star is updated
 * Do: Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*360
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
 * Called: When the star position is updated
 * Do: convert polar coordinates to cardinal coordinates
 * @param {Number} deg     degree of the coordinates
 * @param {Number} radius  radius of the coordinates
 * @returns a vector with x and y
 */
function getCardinalCoordinates(deg, radius) {
    let theta = (2 * Math.PI) / 360;

    let y = Math.cos(theta*(deg+90%360)) * radius
    let x = Math.sin(theta*(deg+90%360)) * radius
    let cardinal = [Number(x), Number(y)]
    return cardinal;
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