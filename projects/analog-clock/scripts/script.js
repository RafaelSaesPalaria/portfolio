/**
Clock Second = seconds of the digital/analog clocks, if you accelerate them the clock-seconds will pass faster
VH = Viewport Height, the weight of the screen basically
 */

import { formattedNumbers } from "../scripts/util.js";

// Global Attributes
var time = new Date();
var timeDirection=1
var timeSpeed =1
var intervalSpeed = 1000
var interval = setInterval(clockWork,1000)


var vh=0

/**
 * Called: When the screen is zoomed or when the application start
 * Do: update the vh
 */
function resize() {
    //vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    vh = 500
    setNumbersPosition((0.19*vh), 12)
    addMinuteBar((0.22*vh), 60)
}

/**
 * Called: at every clock second (if you speed the clock you speed the time)
 * Do: change the time of the analog clock and of the digital clock
 */
function clockWork() {
    updateTime()
    rotatePointers()
    updateDigitalClock()
}

//Methods
/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
document.querySelector("span#fast_rewind").addEventListener("click",fast_rewind)
function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
document.querySelector("span#pause").addEventListener("click",pause)
function pause() {
    timeSpeed=0
    updateTimeSpeed()
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
document.querySelector("span#play").addEventListener("click",play)
function play() {
    timeSpeed=1
    timeDirection=1
    updateTimeSpeed()
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
document.querySelector("span#backward").addEventListener("click",backward)
function backward() {
    timeDirection=-1
    timeSpeed=1
    updateTimeSpeed()
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
document.querySelector("span#accelerate").addEventListener("click",accelerate)
function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeSpeed);
    updateTimeSpeed()
}

/**
 * Called: When the timespeed changes
 * Do: change the timespeed on the player
 */
function updateTimeSpeed() {
    let span = document.querySelector("div#player span#timespeed")
    span.innerText=`${timeSpeed.toFixed(2)}x`
}

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

    /*timeAdjust(seconds, minutes, 60)
    timeAdjust(minutes, hours,60)
    timeAdjust(hours, ////, 24)*/

}

/**
 * Called: When the time is updated
 * Do: rotate the cycle when its over and call the next one
 * @param {Number} actual 
 * @param {Number} next 
 * @param {Number} maxCycle 
 */
function timeAdjust(actual,next,maxCycle) {
    if (actual >= maxCycle) {
        actual = 0 ;
        next+=1
    } else if (actual < 0) {
        actual = maxCycle-1;
        next-=1;
    }
}

/**
 * Called: When the angle of a pointer need to be calculated (every clock second)
 * Do: Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
function parseAngle(currentlyTime,cycleMax) {
    return (currentlyTime/cycleMax)*360
}

/**
 * Called: At every clock-second
 * Do: rotate the pointers
 */
function rotatePointers() {
    //Pointers  [0] = Hours, [1] = Minutes, [2] = Seconds
    let pointers = document.querySelectorAll("div.pointer")

    rotatePointer(pointers[0],parseAngle(time.getHours()+(time.getMinutes()/60),12))
    rotatePointer(pointers[1],parseAngle(time.getMinutes()+(time.getSeconds()/60),60))
    rotatePointer(pointers[2],parseAngle(time.getSeconds(),60))
}

/**
 * Error: the deg shouldn't +=180 in this method
 * Called: at every clock second
 * Do: Rotate the pointer elements based on the deg
 * @param {Object}   pointer The object thats gonna be rotated
 * @param {Number} deg      The angle which the pointer is gonna rotate
 */
function rotatePointer(pointer, deg) {
    deg+=180
    pointer.style.transform = `rotate(${deg}deg)` 
}

/**
 * ERROR/TODO: Deg+=270 shouldn't exist
 * Called: When the numbers and bars position are set
 * Do: Convert A position in polar coordination to cardinal coordination
 * @param {Number} radius radius of the coordinate
 * @param {Number} deg degree of the angle
 * @returns The cardinal coordinates
 */
function polarToCardinal(radius, deg) {
    deg+=270
    let theta = (2 * Math.PI) / (360/deg)
    let x = (Math.sin(theta)*radius)
    let y = (Math.cos(theta)* radius)
    return {x:x,y:y}
}

/**
 * Called: at every clock-second
 * Do: update the elements of the digital clock based on the clock-time
 */
function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock #time");

    let hours      = formattedNumbers(time.getHours(), 2)
    let minutes  = formattedNumbers(time.getMinutes(), 2)
    let seconds = formattedNumbers( time.getSeconds(), 2)

    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

/**
 * Called: At the start of the application or when the application is zoomed
 * Do: Create and position the numbers elements
 * @param {Number} qntNumbers amount of numbers to be displayed on the clock
 * @param {Number} radius distance from the center
 */
function setNumbersPosition(radius, qntNumbers) {
    let div = document.querySelector("div#numbers")
    div.innerHTML = '';

    for (let i=1;i<=qntNumbers;i++) {
        
        let n = document.createElement("span");
        n.setAttribute("id",`n${i}`)
        n.innerHTML = `${i}`
        
        let coords= polarToCardinal(radius,i*(360/qntNumbers))
        n.style.top = `calc(50% + ${coords.x}px)`;
        n.style.left = `calc(50% + ${coords.y}px)`

        div.appendChild(n)
    }
}

/**
 * Called: at the start of the application or when the application is zoomed
 * Do: Create the bars of the minutes and positions it's elements
 * @param {Number} nbars amount of bars to be displayed at the clock
 * @param {Number} radius distance from the center
 */
function addMinuteBar(radius, nbars) {
    let bars = document.querySelector("div#bars")
    bars.innerHTML = '';

    for (let i=0;i<nbars;i++) {
        let bar = document.createElement("div")

        if (i%5==0) {
            bar.style.width = "1.2vh"
        }

        let coords = polarToCardinal(radius,i*(360/nbars))

        bar.style.top = `calc(50% + ${coords.x}px)`
        bar.style.left = `calc(49% + ${coords.y}px)`

        bar.style.transform = `rotate(${i*(360/nbars)+90}deg)`

        bars.appendChild(bar)
    }
}

//Constructor
/**
 * Called: When the application Start
 * Do: Iniciate the application functions
 */
window.addEventListener('zoom', resize);
start()
function start() {
    resize()
    clockWork()
}