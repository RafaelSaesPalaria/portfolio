//Global Variables
var vh = 0

var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")
var starField = document.querySelector("div#starField")

export var position=0

import { polarToCardinal } from "./util.js"
import { Star, createStars } from "./star.js"

export var stars = []

stars.push(new Star(sun,earth,0.4,0.4, false))
stars.push(new Star(earth,moon,0.8,0.2, true))
stars.push(new Star(moon, moon, 0.8, 0.2, false))

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
    stars.forEach(star => {
        star.update()
    })
    rotateStar(starField, position*0.2)
    position+=1
    requestAnimationFrame(animate)
}

/**
 * @ERROR/TODO: this method don't actually resize the screen
 * @Called: at the start or when a zoom happens
 * @Do: Resizes the screen
 */
function resize() {
    //vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    vh = 500
    start()
}

/**
 * @Called: When any non-farway-star is called
 * @Do: Center the currently star
 * @param {Object} star the star that's gonna be centered
 */
export function center(star) {
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
 * @Called: after the stars are centered
 * @Do: Create a radial gradient in the earth to look like the sun light
 * @param {Object} element the element have its background changed
 * @param {Number} deg the degree of the rotation of the gradient in the earth 
 */
export function updateBackground(element,deg) {
    deg = (360 - (deg-90)) % 360;
    let coords = polarToCardinal(deg,100)


    element.style.background = `radial-gradient(circle at ${50 + coords.x}% ${50 + coords.y}%, darkblue, blue 60%, yellow 95%)`;
}