//Global Variables
var vh = 0

var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")
var starField = document.querySelector("div#starField")

var position=0
var moonspeed = 0.8
var earthspeed = 0.4

var interval = setInterval(sunCentered,10)

//Constructor
function start() {
    resize();
    window.addEventListener('zoom', resize);
    createStars();
    starClicked(sun)
}

/**
 * ERROR/TODO: this method don't actually resize the screen
 * Called: at the start or when a zoom happens
 * Do: Resizes the screen
 */
function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

/**
 * Called: When a star is clicked
 * Do: Set the position of the components to align with the center of the star
 */
function starClicked(star) {
    clearInterval(interval)
    interval = setInterval(function() {starCentered(star)},10)
    starCentered(star)
    center(star)
}

/**
 * ERROR/TODO: if star!==moon shouldn exist
 * Called: Called when a star is clicked, or at every 10ms [Recursive]
 * Do: Position the orbit to center a star
 * @param {Object} star the star thats gonna be in the center
 */
function starCentered(star) {
    rotateStar(starField, -position*0.4)
    orbit(star,sun,position*0.4,vh*0.4)
    orbit(star,earth,position*0.8,vh*0.2)
    if (star!==moon) {
    orbit(earth,moon,position*0.9,vh*0.1)
    }
    updateEarthBackground((position*0.8)+180)
    position+=1
}

/**
 * Called: When any non-farway-star is called
 * Do: Center the currently star
 * @param {Object} star the star that's gonna be centered
 */
function center(star) {
    star.style.left = `${innerWidth/2}px`
    star.style.top = `${innerHeight/2}px`
}

/**
 * Called: When a star is centered
 * Do: Rotate the obj
 * @param {Object} star object to be rotated
 * @param {Number} position degree of rotation 
 */
function rotateStar(star, position) {
    star.style.transform = `translateY(-25%) rotate(${position%360}deg)`;
}

/**
 * Called: When any centered star need the orbit of it's satellites
 * Do: Make the one star orbit another one
 * @param {Object}   centerStar   the primary star
 * @param {Object}   satelliteStar the star thats gonna orbit the primary star
 * @param {Number} deg             the currently degree of the orbit
 * @param {Number} radius         the radius of the orbit
 */
function orbit(centerStar,satelliteStar,deg,radius) {
    if (centerStar===satelliteStar) {return}

    let theta = (Math.PI*2)/360
    let orbitX = Math.sin(theta*deg)*(radius)
    let orbitY = Math.cos(theta*deg)*(radius)

    let centerX = centerStar.getBoundingClientRect().left + centerStar.getBoundingClientRect().width / 2;

    let centerY = centerStar.getBoundingClientRect().top + centerStar.getBoundingClientRect().height / 2;

    satelliteStar.style.top = `${centerY+orbitY}px`
    satelliteStar.style.left = `${centerX+orbitX}px`
    
}

/**
 * Called: at the start
 * Do: Create the far-away stars in the background
 */
function createStars() {

    // Change the size of the starfield to match the biggest side
    if (starField.offsetHeight>starField.offsetWidth) {
        starField.style.width = `${starField.offsetHeight}px`
    } else {
        starField.style.height = `${starField.offsetWidth}px`
    }

    for (let n = 0 ; n < 200 ; n++) {
        let star = window.document.createElement("div")
        star.id = `star-${n}`
        star.classList.add("star")
        starField.appendChild(star)

        window.document.getElementById("star-"+n).style.top = (Math.random()*100)+"%";
        window.document.getElementById("star-"+n).style.left = (Math.random()*100)+"%";
    }
}

/**
 * Called: When the earth need to update it's background
 * Do: Convert polar coordinates to cardinal coordinates
 * @param {Number} deg    degree of the coordinate
 * @param {Number} radius distance from the center
 * @returns x, y as hash
 */
function polarToCardinal(deg, radius) {
    let theta = (Math.PI * 2) / (360/deg)

    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    return {x:x,y:y}
}

/**
 * Called: after the stars are centered
 * Do: Create a radial gradient in the earth to look like the sun light
 * @param {Number} deg the degree of the rotation of the gradient in the earth 
 */
function updateEarthBackground(deg) {
    deg = (360 - (deg-90)) % 360;
    let coords = polarToCardinal(deg,100)


    earth.style.background = `radial-gradient(circle at ${50 + coords.x}% ${50 + coords.y}%, darkblue, blue 60%, yellow 95%)`;
}