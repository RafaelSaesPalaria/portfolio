/**
 * Called: When the angle of a star is updated
 * Do: Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
export function parseAngle(actualTime,cycleMax) {
    return (actualTime/cycleMax)*360
}

/**
 * ERROR/TODO: find a way to improve this function
 * Called: When the digital clock updates
 * Do: Format a number to have a certain length
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
 * Called: When the star position is updated
 * Do: convert polar coordinates to cardinal coordinates
 * @param {Number} deg     degree of the coordinates
 * @param {Number} radius  radius of the coordinates
 * @returns a vector with x and y
 */
export function getCardinalCoordinates(deg, radius) {
    let theta = (2 * Math.PI) / 360;

    let y = Math.cos(theta*(deg%360)) * radius
    let x = Math.sin(theta*(deg%360)) * radius
    let cardinal = {x:Number(x),y: Number(y)}
    return cardinal;
}