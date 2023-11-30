//Global Attributes
var time;

//Constructor
setInterval(start,1000)
function start() {
    getTime();
    updateDigitalClock();
    updateSun();
    updateMoon();
    updateBackground();
}

//Methods
function getTime() {
    time = new Date();
    /*time = {
        getHours() {
            return 18
        },
        getMinutes() {
            return 0
        },
        getSeconds() {
            return 0
        }
    }*/ 
}

function updateDigitalClock() {
    let digital_clock = document.querySelector("div#digital-clock")
    digital_clock.innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
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
    let sun_x = document.querySelector("div#sun").getBoundingClientRect().left;
    let sun_y = document.querySelector("div#sun").getBoundingClientRect().top;

    body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange, lightblue, blue)`
}