//Global Attributes
var time = new Date();;
var timeDirection = 1
var timeSpeed     = 1
var intervalSpeed = 1000
var degree = 0

var vh = 0

var sun = document.querySelector("div#sun")
var moon = document.querySelector("div#moon")

//Constructor
setInterval(update,intervalSpeed)
function start() {
    resize()
    window.addEventListener('zoom', resize);
    update()
}

/**
 * Updates the system
 */
function update() {
    updateTime();
    updateDigitalClock();
    updateStar(sun, 0, vh*0.7)
    updateStar(moon, 180, vh*0.6)
    updateBackground();
}

/**
 * Resize the screen
 */
function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

//Methods
//Controls
function disaccelerate() {
    timeSpeed*=0.9;
    setInterval(update,intervalSpeed/timeSpeed);
}

function forward() {
    timeDirection=1
}

function pause() {
    timeSpeed=0
}

function play() {
    timeSpeed=1
    timeDirection=1
}

function backward() {
    timeDirection=-1
}

function accelerate() {
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
}

//Update the time based on the timeDirection and in the timeSpeed
function updateTime() {
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    time.setSeconds(seconds + timeDirection * timeSpeed);

    if (time.getSeconds() >= 60) {
        time.setSeconds(0);
        time.setMinutes(minutes + 1);
    } else if (time.getSeconds() < 0) {
        time.setSeconds(59);
        time.setMinutes(minutes - 1);
    }

    if (time.getMinutes() >= 60) {
        time.setMinutes(0);
        time.setHours(hours + 1);
    } else if (time.getMinutes() < 0) {
        time.setMinutes(59);
        time.setHours(hours - 1);
    }

    if (time.getHours() >= 24) {
        time.setMinutes(0);
        time.setHours(0);
    } else if (time.getHours() < 0) {
        time.setHours(23);
    }
}

/**
 * Update the time in the digital clock
 */
function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock");

    let hours = formatNumber(time.getHours(),2)
    let minutes = formatNumber(time.getMinutes(), 2)
    let seconds = formatNumber(time.getSeconds(), 2)
    
    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function formatNumber(number ,length) {
    let string = ""
    for (let i = number.toString().length; i<length; i++) {
        string+="0"
    }
    number = string+number.toString()
    return number
}

/**
 * Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*360
}

/**
 * get the angle based on the time
 * @returns the degree of the angle
*/
function getAngle() {
    let dayTime_inSeconds = 
                        (time.getHours()*3600) + (time.getMinutes()*60) + time.getSeconds()
    degree = parseAngle(dayTime_inSeconds,(24*60*60))   
    return degree;
}

/**
 * convert polar coordinates to cardinal coordinates
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
 * move the star to the currently time-location
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
 * Update the background
 */
function updateBackground() {
    let body = document.body;
    let sun = document.querySelector("div#sun");
    let moon = document.querySelector("div#moon")

    let sun_x = sun.getBoundingClientRect().left+35; //70 is the sun width
    let sun_y = sun.getBoundingClientRect().top+35;

    let moon_x = moon.getBoundingClientRect().left+25; // 50 is the moon width
    let moon_y = moon.getBoundingClientRect().top+25;

        body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange 10%, lightblue 35%, blue 95%)`
}