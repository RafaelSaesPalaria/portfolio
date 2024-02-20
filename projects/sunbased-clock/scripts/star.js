import {getAngle} from "./script.js"
import { getCardinalCoordinates, max } from "./util.js";

export var stars = {
    sun: {
        element: document.querySelector("div#sun"),
        degPlus: 90,
        distance: 350
    },
    moon: {
        element: document.querySelector("div#moon"),
        degPlus: 270,
        distance: 300
    }
}

/**
 * Called: at every clock-second
 * Do: move the star to the currently time-location
 * @param {Object}   star        the star that's gonna be moved      
 * @param {Number} degPlus the plus factor in the degree calc 
 * @param {Number} radius    the distance of the star from the center of the orbit
 */
export function updateStar(star, degPlus, radius) {
    let deg = getAngle();
    let cardinal = getCardinalCoordinates((deg+degPlus)%max.degree,radius)
    star.style.top = `calc(100% + ${cardinal.x}px)`
    star.style.left = `calc(50% + ${cardinal.y}px)`
}

/**
 * Called: At every clock-second
 * Do: Update the background
 */
export function updateBackground() {
    let sun = stars.sun.element;

    let sun_x = sun.getBoundingClientRect().left+sun.clientWidth/2;
    let sun_y = sun.getBoundingClientRect().top+sun.clientHeight/2;

    document.body.style.backgroundImage = `radial-gradient(circle at ${sun_x}px ${sun_y}px , yellow, orange 10%, lightblue 35%, blue 95%)`
}