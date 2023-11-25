// Global Attributes
setInterval(start,1000)
var time = 0;

var pointer_hours= document.querySelector("div#hours")
var pointer_minutes= document.querySelector("div#minutes")
var pointer_seconds= document.querySelector("div#seconds")

//Constructor
function start() {
    getTime();
    rotatePointer(pointer_hours     ,parseAngle(time.getHours()    ,12))
    rotatePointer(pointer_minutes ,parseAngle(time.getMinutes() ,60))
    rotatePointer(pointer_seconds,parseAngle(time.getSeconds(),60))
}

//Methods
function getTime() {
    time = new Date();
}

function parseAngle(actualTime,cicleMax) {
    return (actualTime/cicleMax)*360
}

function rotatePointer(pointer, deg) {
    deg+=180 // +180degs because the clock start at the bottom 
    pointer.style.transformOrigin = 'top left';
    pointer.style.transform = `rotate(${deg}deg)` 
    
}