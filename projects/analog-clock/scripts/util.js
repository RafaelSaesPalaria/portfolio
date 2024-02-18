/**
 * Called: when update clock need (every clock-second)
 * Do: Check if the number has the desired length and add zeros at the start if it don't
 * @param {Number} numbers unformatted number
 * @param {Number} length desired length
 * @returns formatted number
 */
export function formattedNumbers(numbers, length) {
    let zeros=""
    for (let i=0; i < length-numbers.toString().length; i++) {
        zeros+="0"
    }
    numbers=zeros+numbers
    return numbers
}

/**
 * Called: When the angle of a pointer need to be calculated (every clock second)
 * Do: Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
export function parseAngle(currentlyTime,cycleMax) {
    return (currentlyTime/cycleMax)*360
}

/**
 * Called: When the numbers and bars position are set
 * Do: Convert A position in polar coordination to cardinal coordination
 * @param {Number} radius radius of the coordinate
 * @param {Number} deg degree of the angle
 * @returns The cardinal coordinates
 */
export function polarToCardinal(radius, deg) {
    let theta = (2 * Math.PI) / (360/deg)
    let x = (Math.sin(theta)*radius)
    let y = (Math.cos(theta)* radius)
    return {x:x,y:y}
}

/**
 * Called: at every clock second
 * Do: Rotate the pointer elements based on the deg
 * @param {Object}   pointer The object thats gonna be rotated
 * @param {Number} deg      The angle which the pointer is gonna rotate
 */
export function rotatePointer(pointer, deg) {
    pointer.style.transform = `rotate(${deg}deg)` 
}