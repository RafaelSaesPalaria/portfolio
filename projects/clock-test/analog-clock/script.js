// Global Attributes
var time = 0;
var pointer_hours= document.querySelector("div#hours")
var pointer_minutes= document.querySelector("div#minutes")
var pointer_seconds= document.querySelector("div#seconds")

//Constructor
/**
 * used to update the clock based on the computer time at every 1s
 */
setInterval(clockWork,1000)
function start() {
    setNumbersPosition()
    addMinuteBar()
    clockWork()
}

function clockWork() {
<<<<<<< Updated upstream
    setNumbersPosition()
    addMinuteBar()
}

function clockWork() {
=======
>>>>>>> Stashed changes
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
    pointer.style.transformOrigin = '25% 0%';
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

function setNumbersPosition() {

    let r = 120;

    for (let i=1;i<=12;i++) {
        let n = document.querySelector(`span#n${i}`)

        let theta = (2 * Math.PI) / 12;
        x = (Math.sin((theta*i)+11)*r)
        y = (Math.cos((theta*i)+11)*r)
        n.style.top = `calc(50% + ${x}px)`;
        n.style.left = `calc(50% + ${y}px)`
    }
}

function addMinuteBar() {
    let bars = document.querySelector("div#bars")
    let r = 140;
    
    for (let i=0;i<60;i++) {
        let bar = document.createElement("div")

        if (i%5==0) {
            bar.style.width = "8px"
        }


        let theta = (2 * Math.PI) / 60;
        x = Math.sin(theta*i)*r
        y = Math.cos(theta*i)*r

        bar.style.top = `calc(50% + ${x}px)`
        bar.style.left = `calc(49% + ${y}px)`

        bar.style.transformOrigin = "center";
        bar.style.transform = `rotate(${i*6}deg)`

        bars.appendChild(bar)
    }

}