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
/**
 * Called: When the application start
 * Do: Set the resize/update function
 */
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
function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
function pause() {
    timeSpeed=0
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
function play() {
    timeSpeed=1
    timeDirection=1
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
function backward() {
    timeDirection=-1
    timeSpeed=1
}

/**
 * Called: When the accelarate button is pressed
 * Do: Accelerate the interval
 */
function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
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
 * Called: when the digital clock changes
 * Do: change the player from lightmode to nightmode when needed
 */
function daynightmodePlayer() {
    let digitalclock = document.querySelector("div#digital-clock")
    let timed = document.querySelector("div#time");
    let players = document.querySelectorAll("div#player span")
    let color1 = "white";
    let color2 = "black"

    if (time.getHours()>=18 || time.getHours()<6) {
        let aux = color1;
        color1 = color2
        color2 = aux
    }

    digitalclock.style.background = `${color1}`
    digitalclock.style.borderColor = `${color2}`
    timed.style.background = `${color1}`
    timed.style.color = `${color2}`
    players.forEach(player => {
        player.style.background = `${color1}`
        player.style.borderColor = `${color2}`
        player.style.color = `${color2}`
    }) 
}

/**
 * Called: At every clock-second
 * Do: Update the time in the digital clock
 */
function updateDigitalClock() {
    let digital_clock = document.querySelector("div#time");

    let hours = formatNumber(time.getHours(),2)
    let minutes = formatNumber(time.getMinutes(), 2)
    let seconds = formatNumber(time.getSeconds(), 2)
    
    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
    daynightmodePlayer()
}

/**
 * Called: When the digital clock updates
 * Do: Format a number to have a certain length
 * @param {Number} number the unformatted number
 * @param {Number} length   the desired length
 * @returns the formatted number
 */
function formatNumber(number ,length) {
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