//Global Attributes
var time = new Date();;
var timeDirection = 1
var timeSpeed     = 1
var intervalSpeed = 1000

//Constructor
setInterval(update,intervalSpeed)

function start() {
    update()
}

function update() {
    updateTime();
    updateDigitalClock();
    updateSun();
    updateMoon();
    updateBackground();
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
}

function backward() {
    timeDirection=-1
}

function accelerate() {
    timeSpeed*=1.1;
    setInterval(update,intervalSpeed/timeSpeed);
}

//Update
function updateTime() {
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    time.setSeconds(seconds+=timeDirection*timeSpeed);
    if (seconds>=60) {
        seconds=0
        minutes+=1
    }
    if (minutes>=60) {
        minutes=0
        hours+=1
    }
    if (hours>=60) {
        minutes=0
        hours+=1
    }
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

function getAngle() {
    let dayTime_inSeconds = 
                        (time.getHours()*3600) + (time.getMinutes()*60) + time.getSeconds()
    let degree = dayTime_inSeconds/(24*60*60)*360
    return degree;
}

function updateSun() {
    let sun_axis = document.querySelector("div#sun-axis")
    let deg = getAngle();
    deg+=90                         // TODO: +90degs because the clock start at the left
    sun_axis.style.transformOrigin = 'top left';
    sun_axis.style.transform = `rotate(${deg}deg)` 
}

function updateMoon() {
    let moon_axis = document.querySelector("div#moon-axis")
    let deg = getAngle();
    deg-=90                         // TODO: +90degs because the clock start at the left
    moon_axis.style.transformOrigin = 'top left';
    moon_axis.style.transform = `rotate(${deg}deg)` 
}

function updateBackground() {
    let body = document.body;
    let sun = document.querySelector("div#sun");
    let moon = document.querySelector("div#moon")

    let sun_x = sun.getBoundingClientRect().left+35; //70 is the sun width
    let sun_y = sun.getBoundingClientRect().top+35;

    let moon_x = moon.getBoundingClientRect().left+25; // 50 is the moon width
    let moon_y = moon.getBoundingClientRect().top+25;

    if (time.getHours()>5 && time.getHours()<18) {
        body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange 10%, lightblue 35%, blue 95%)`

    } else {
        body.style.backgroundImage = `radial-gradient(circle at ${moon_x}px ${moon_y}px , darkblue 5%, blue 35%)`
    }
}