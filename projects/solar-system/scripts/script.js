//Global Variables
var vh = 0

export var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")
var starField = document.querySelector("div#starField")

export var position=0

import { polarToCardinal, rotateElement } from "./util.js"
import { createStars, orbit, stars } from "./star.js"

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
    /*position*this.speed,500*this.distance */
    orbit(stars["0"],stars["0"]["0"],position*stars["0"].speed,500*stars["0"].distance)
    orbit(stars["0"]["0"],stars["0"]["0"]["0"],position*stars["0"]["0"].speed,500*stars["0"]["0"].distance)
    rotateElement(starField, position*0.2)
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