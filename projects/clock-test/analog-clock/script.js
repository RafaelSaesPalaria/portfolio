// Global Attributes
var time = 0;
var pointer_hours= document.querySelector("div#hours")
var pointer_minutes= document.querySelector("div#minutes")
var pointer_seconds= document.querySelector("div#seconds")

//Constructor
/**
 * used to update the clock based on the computer time at every 1s
 */
setInterval(start,1000)
function start() {
    getTime();
    rotatePointer(pointer_hours     ,parseAngle(time.getHours()    ,12))
    rotatePointer(pointer_minutes ,parseAngle(time.getMinutes() ,60))
    rotatePointer(pointer_seconds,parseAngle(time.getSeconds(),60))
    updateDigitalClock()
}

//Methods

//update global variable time based on the computer time
function getTime() {
    time = new Date();
}

/**used to convert time in angle (degs)
 * @param {Number} actualTime the actual value of the cicle
 * @param {Number} cicleMax the biggest value of the cicle
 * @returns the current angle of the cicle
 */
function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*360
}

/**
 * used to rotate the pointers based on the degree
 * @param {Element} pointer the pointer thats gonna rotate
 * @param {Number} deg       the rotation in degrees
 */
function rotatePointer(pointer, deg) {
    deg+=180 // TODO: +180degs because the clock start at the bottom 
    pointer.style.transformOrigin = 'top center';
    pointer.style.transform = `rotate(${deg}deg)` 
}

function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock");
    let hours     = time.getHours();
    let minutes = time.getMinutes();
    let seconds= time.getSeconds();

    hours      = hours    < 10 ? "0" +  hours     : hours;
    minutes  = minutes < 10 ? "0" +  minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    digital_clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}