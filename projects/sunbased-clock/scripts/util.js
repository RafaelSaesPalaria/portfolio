export const max = {
    seconds: 60,
    minutes: 60,
    hours: 24,
    degree: 360
}

/**
 * @Called : When the angle of a star is updated
 * @Do : Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
export function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*max.degree
}

/**
 * ERROR/TO@DO : find a way to improve this function
 * @Called : When the digital clock updates
 * @Do : Format a number to have a certain length
 * @param {Number} number the unformatted number
 * @param {Number} length   the desired length
 * @returns the formatted number
 */
export function formatNumber(number ,length) {
    let string = ""
    for (let i = number.toString().length; i<length; i++) {
        string+="0"
    }
    number = string+number.toString()
    return number
}

/**
 * @Called : When the star position is updated
 * @Do : convert polar coordinates to cardinal coordinates
 * @param {Number} deg     degree of the coordinates
 * @param {Number} radius  radius of the coordinates
 * @returns a vector with x and y
 */
export function getCardinalCoordinates(deg, radius) {
    let theta = (2 * Math.PI) / max.degree;

    let y = Math.cos(theta*deg) * radius
    let x = Math.sin(theta*deg) * radius
    let cardinal = {x:x,y:y}
    return cardinal;
}