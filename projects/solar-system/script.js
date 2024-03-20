//Global Variables
var vh = 0

var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")
var starField = document.querySelector("div#starField")

sun.addEventListener("click",function () {
    starClicked(ssun)
})
earth.addEventListener("click",function () {
    starClicked(searth)
})
moon.addEventListener("click",function () {
    starClicked(smoon)
})


var position=0

import { polarToCardinal } from "./util.js"

/**
 * @Called: When a star is created
 * @Do: Represent the star
 */
class Star {
    constructor(element, satellite, speed, distance, background) {
        this.element = element
        this.satellite = satellite
        this.distance = distance
        this.speed = speed
        this.center = false
        this.background = background
    }
    /**
     * @Called: At every frame
     * @Do: Set the position of the star and of the satellite
     */
    update() {
        orbit(this.element,this.satellite,position*this.speed,vh*this.distance)
        if (this.center) {center(this.element)}
        if (this.background) { 
            updateBackground(this.element, position*0.4) 
        }
    }

    /**
     * @Do: Center the obj
     * @Called: When a star is clicked
     * @param {Boolean} center if the object is supposed to be centered
     */
    setCenter(center) {
        this.center = center
    }
}

var ssun = new Star(sun,earth,0.4,0.4, false)
var searth = new Star(earth,moon,0.8,0.2, true)
var smoon = new Star(moon, moon, 0.8, 0.2, false)

//Constructor
start()
resize();
window.addEventListener('zoom', resize);
function start() {
    createStars();
    animate()
}

/**
 * @Called: called at every frame
 * @Do: animate the css
 */
function animate() {
    ssun.update()
    searth.update()
    smoon.update()
    rotateStar(starField, position*0.2)
    position+=1
    requestAnimationFrame(animate)
}

/**
 * @ERROR/TODO: this method don't actually resize the screen
 * Called: at the start or when a zoom happens
 * @Do: Resizes the screen
 */
function resize() {
    //vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    vh = 500
    start()
}

/**
 * @Called: When a star is clicked
 * @Do: Set the position of the components to align with the center of the star
 */
function starClicked(star) {
    ssun.setCenter(false)
    searth.setCenter(false)
    smoon.setCenter(false)
    star.setCenter(true)
}

/**
 * @Called: When any non-farway-star is called
 * @Do: Center the currently star
 * @param {Object} star the star that's gonna be centered
 */
function center(star) {
    sun.style.left = `${(innerWidth/2)  - star.offsetLeft+sun.offsetLeft}px`
    sun.style.top = `${(innerHeight/2) - star.offsetTop+sun.offsetTop}px`
}

/**
 * @Called: When a star is centered
 * @Do: Rotate the obj
 * @param {Object} star object to be rotated
 * @param {Number} position degree of rotation 
 */
function rotateStar(star, position) {
    star.style.transform = `translateY(-25%) rotate(${position%360}deg)`;
}

/**
 * @Called: When any centered star need the orbit of it's satellites
 * @Do: Make the one star orbit another one
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
 * @Called: at the start
 * @Do: Create the far-away stars in the background
 */
function createStars() {

    // Change the size of the starfield to match the biggest side
    if (starField.offsetHeight>starField.offsetWidth) {
        starField.style.width = `${starField.offsetHeight}px`
    } else {
        starField.style.height = `${starField.offsetWidth}px`
    }

    starField.innerHTML = ""
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
 * @Called: after the stars are centered
 * @Do: Create a radial gradient in the earth to look like the sun light
 * @param {Object} element the element have its background changed
 * @param {Number} deg the degree of the rotation of the gradient in the earth 
 */
function updateBackground(element,deg) {
    deg = (360 - (deg-90)) % 360;
    let coords = polarToCardinal(deg,100)


    element.style.background = `radial-gradient(circle at ${50 + coords.x}% ${50 + coords.y}%, darkblue, blue 60%, yellow 95%)`;
}