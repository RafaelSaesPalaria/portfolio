import { position, updateBackground} from "./script.js"
import { center } from "./util.js"

/**
 * @Called: When a star is created
 * @Do: Represent the star
 */

export class Star {
    constructor(element, speed, distance, background) {
        this.satellites = {}
        this.object = {
            element : element,
            distance : distance,
            speed : speed,
            center : false,
            background: background,
        }
        this.object.element.addEventListener("click", () => {
            starClicked(this)
        })
    }
    addSatellite = function(satellite) {
        this.satellites[Object.keys(this.satellites).length] = satellite
    }
}

export var stars = {}

stars = new Star(sun,0.4,0.4, false)
stars.addSatellite(new Star(earth,0.8,0.2, true))
stars["satellites"]["0"].addSatellite(new Star(moon, 0.8, 0.2, false))
console.log(stars)


/**
 * @Called: at the start
 * @Do: Create the far-away stars in the background
 */
export function createStars() {

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
 * @Called: When a star is clicked
 * @Do: Set the position of the components to align with the center of the star
 */
export function starClicked(star) {
    
}

/**
 * @Called Every ms
 * @Do Make a satellite orbit its star
 * @param {Object} star the center star 
 */
export function orbitStar(star) {
    for (let satellite in star.satellites) {
        orbit(star.object,star.satellites[satellite].object,position*star.object.speed,500*star.object.distance)
    }
}

/**
 * @Called: When any centered star need the orbit of it's satellites
 * @Do: Make the one star orbit another one
 * @param {Object}   centerStar   the primary star
 * @param {Object}   satelliteStar the star thats gonna orbit the primary star
 * @param {Number} deg             the currently degree of the orbit
 * @param {Number} radius         the radius of the orbit
 */
export function orbit(centerStar,satelliteStar,deg,radius) {
    centerStar = centerStar.element
    satelliteStar=satelliteStar.element

    if (centerStar===satelliteStar) {return}

    let theta = (Math.PI*2)/360
    let orbitX = Math.sin(theta*deg)*(radius)
    let orbitY = Math.cos(theta*deg)*(radius)

    let centerX = centerStar.getBoundingClientRect().left + centerStar.getBoundingClientRect().width / 2;

    let centerY = centerStar.getBoundingClientRect().top + centerStar.getBoundingClientRect().height / 2;

    satelliteStar.style.top = `${centerY+orbitY}px`
    satelliteStar.style.left = `${centerX+orbitX}px`
    
}