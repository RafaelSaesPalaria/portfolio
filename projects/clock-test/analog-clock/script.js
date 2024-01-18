/**
Clock Second = seconds of the digital/analog clocks, if you accelerate them the clock-seconds will pass faster
 */

// Global Attributes
var time = new Date();
var pointer_hours= document.querySelector("div#hours")
var pointer_minutes= document.querySelector("div#minutes")
var pointer_seconds= document.querySelector("div#seconds")
var timeDirection=1
var timeSpeed =1
var intervalSpeed = 1000
var interval = setInterval(clockWork,1000)


var vh=0

/**
 * Called: When the screen is zoomed
 * Do: update the vh
 */
function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    setNumbersPosition()
    addMinuteBar()
}

/**
 * Called: at every clock second (if you speed the clock you speed the time)
 * Do: change the time of the analog clock and of the digital clock
 */
function clockWork() {
    updateTime()
    rotatePointer(pointer_hours     ,parseAngle(time.getHours()+(time.getMinutes()/60),12))
    rotatePointer(pointer_minutes ,parseAngle(time.getMinutes()+(time.getSeconds()/60),60))
    rotatePointer(pointer_seconds,parseAngle(time.getSeconds(),60))
    updateDigitalClock()
}

//Methods
function disaccelerate() {
    timeSpeed*=0.9;
    clearInterval(interval)
    interval = setInterval(clockWork,intervalSpeed/timeSpeed);
    updateTimeSpeed()
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

    if (timeSpeed>250) {
        time.setSeconds(seconds + timeDirection * (timeSpeed-250));
    } else {
        time.setSeconds(seconds + timeDirection);
    }

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
 * Error: the formatted number should be a new method
 * Called: at every clock-second
 * Do: update the elements of the digital clock based on the clock-time
 */
function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock #time");
    let hours     = time.getHours();
    let minutes = time.getMinutes();
    let seconds= time.getSeconds();

    hours      = hours    < 10 ? "0" +  hours     : hours;
    minutes  = minutes < 10 ? "0" +  minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
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
    return [x,y]
}

/**
 * Called: At the start of the application
 * Do: Create and position the numbers elements
 */
function setNumbersPosition() {
    let div = document.querySelector("div#numbers")
    div.innerHTML = '';

    let r = 0.19*vh;

    for (let i=1;i<=12;i++) {
        
        let n = document.createElement("span");
        n.setAttribute("id",`n${i}`)
        n.innerHTML = `${i}`
        
        div.appendChild(n)
        let coords= polarToCardinal(r,i*(360/12))
        let x = coords[0]
        let y = coords[1]
        n.style.top = `calc(50% + ${x}px)`;
        n.style.left = `calc(50% + ${y}px)`
    }
}

/**
 * Called: at the start of the application
 * Do: Create the bars of the minutes and positions it's elements
 */
function addMinuteBar() {
    let bars = document.querySelector("div#bars")
    bars.innerHTML = '';

    let r = 0.22*vh;
    
    for (let i=0;i<60;i++) {
        let bar = document.createElement("div")

        if (i%5==0) {
            bar.style.width = "1.2vh"
        }

        let coords = polarToCardinal(r,i*(360/60))
        let x = coords[0]
        let y = coords[1]

        bar.style.top = `calc(50% + ${x}px)`
        bar.style.left = `calc(49% + ${y}px)`

        bar.style.transform = `rotate(${i*(360/60)+90}deg)`

        bars.appendChild(bar)
    }
}

//Constructor
/**
 * Called: When the application Start
 * Do: Iniciate the application functions
 */
function start() {
    resize()
    window.addEventListener('zoom', resize);
    setNumbersPosition()
    addMinuteBar()
    clockWork()
}