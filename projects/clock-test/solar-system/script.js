//Global Variables
var vh = 0

var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")

var position=0
var moonspeed = 0.8
var earthspeed = 0.4

var interval = setInterval(sunCentered,10)

//Constructor
function start() {
    resize();
    window.addEventListener('zoom', resize);
    createStars();
    sunCentered()
}

//Resizes the screen
function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

//Set the position of the component to align with the center of the sun
function sunClicked() {
    clearInterval(interval)
    interval = setInterval(sunCentered,10)
    sunCentered()
    center(sun)
}

//Set the position of the component to align with the center of the earth
function earthClicked() {
    clearInterval(interval)
    interval = setInterval(earthCentered,10)
    earthCentered()
    center(earth)
}

//Set the position of the component to align with the center of the moon
function moonClicked() {
    clearInterval(interval)
    interval = setInterval(moonCentered,10)
    moonCentered()
    center(moon)
}

/**
 * Center the currently star
 * @param {Object} star 
 */
function center(star) {
    star.style.left = `${innerWidth/2}px`
    star.style.top = `${innerHeight/2}px`
}

//Update the position of the stars the align with the sun
function sunCentered() {
    orbit(sun   ,earth,position*0.4,vh*0.4)
    orbit(earth,moon,position*0.8,vh*0.2)
    updateEarthBackground(position*0.4)

    position+=1
}

//Update the position of the stars the align with the earth
function earthCentered() {
    orbit(earth, sun,position*0.4,vh*0.4)
    orbit(earth,moon,position*0.8,vh*0.2)
    updateEarthBackground((position*0.4)+180)

    position+=1
}

//Update the position of the stars the align with the moon
function moonCentered() {
    orbit(moon,sun,position*0.4,vh*0.4)
    orbit(moon,earth,position*0.8,vh*0.2)
    updateEarthBackground((position*0.4)+180)

    position+=1
}

/**
 * Make the one star orbit another one
 * @param {Object}   centerStar   the primary star
 * @param {Object}   satelliteStar the star thats gonna orbit the primary star
 * @param {Number} deg             the currently degree of the orbit
 * @param {Number} radius         the radius of the orbit
 */
function orbit(centerStar,satelliteStar,deg,radius) {

    let theta = (Math.PI*2)/360
    let orbitX = Math.sin(theta*deg)*(radius)
    let orbitY = Math.cos(theta*deg)*(radius)

    let centerX = centerStar.getBoundingClientRect().left + centerStar.getBoundingClientRect().width / 2;

    let centerY = centerStar.getBoundingClientRect().top + centerStar.getBoundingClientRect().height / 2;

    satelliteStar.style.top = `${centerY+orbitY}px`
    satelliteStar.style.left = `${centerX+orbitX}px`
}

/**
 * Create the far-away stars in the background
 */
function createStars() {
    for (n=0;n<200;n++) {
        window.document.getElementById("stars").innerHTML += '<div class="star" id=star-'+n+'></div>';

        window.document.getElementById("star-"+n).style.top = (Math.random()*100)+"%";
        window.document.getElementById("star-"+n).style.left = (Math.random()*100)+"%";
    }
}

/**
 * Create a radial gradient in the earth to look like the sun light
 * @param {Number} deg the degree of the rotation of the gradient in the earth 
 */
function updateEarthBackground(deg) {
    deg = (360 - (deg-90)) % 360;
    let theta = (deg * Math.PI) / 180;

    let x = Math.cos(theta) * 100;
    let y = Math.sin(theta) * 100;

    earth.style.background = `radial-gradient(circle at ${50 + x}% ${50 + y}%, darkblue, blue 60%, yellow 95%)`;
}