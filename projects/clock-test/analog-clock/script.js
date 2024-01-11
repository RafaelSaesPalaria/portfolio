// Global Attributes
var time = new Date();
var pointer_hours= document.querySelector("div#hours")
var pointer_minutes= document.querySelector("div#minutes")
var pointer_seconds= document.querySelector("div#seconds")
var timeDirection=1
var timeSpeed =1
var intervalSpeed = 1000

var vh=0

//Resize the windows when needed
function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

//Update the system status
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
    setInterval(clockWork,intervalSpeed/timeSpeed);
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
    setInterval(clockWork,intervalSpeed/timeSpeed);
}

//update global variable time based on the computer time
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

/*Get the angle of rotation*/
function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*360
}

/*Rotate the pointers*/
function rotatePointer(pointer, deg) {
    deg+=180 // TODO: +180degs because the clock start at the bottom 
    pointer.style.transform = `rotate(${deg}deg)` 
}

// Update and put the formated time on the digital clock
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

// Create, set the position and add the numbers on the numbers div
function setNumbersPosition() {

    let r = 0.19*vh;

    for (let i=1;i<=12;i++) {
        
        let n = document.createElement("span");
        n.setAttribute("id",`n${i}`)
        n.innerHTML = `${i}`
        
        let div = document.querySelector("div#numbers")
        div.appendChild(n)
        let theta = (2 * Math.PI) / 12;
        x = (Math.sin((theta*i)+11)*r)
        y = (Math.cos((theta*i)+11)*r)
        n.style.top = `calc(50% + ${x}px)`;
        n.style.left = `calc(50% + ${y}px)`
    }
}

/*Used to create, calculate the position and add the bars of the minutes into the bars div*/
function addMinuteBar() {
    let bars = document.querySelector("div#bars")
        //Check if it is mobile
    let r = 0.21*vh;
    
    for (let i=0;i<60;i++) {
        let bar = document.createElement("div")

        if (i%5==0) {
            bar.style.width = "0.8vh"
        }


        let theta = (2 * Math.PI) / 60;
        x = Math.sin(theta*i)*r
        y = Math.cos(theta*i)*r

        bar.style.top = `calc(50% + ${x}px)`
        bar.style.left = `calc(49% + ${y}px)`

        bar.style.transform = `rotate(${i*6}deg)`

        bars.appendChild(bar)
    }

}

//Constructor
/**
 * used to update the clock based on the computer time at every 1s
 */
setInterval(clockWork,1000)
function start() {
    resize()
    window.addEventListener('zoom', resize);
    setNumbersPosition()
    addMinuteBar()
    clockWork()
}