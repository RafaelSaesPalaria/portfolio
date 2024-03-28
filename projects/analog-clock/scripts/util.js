export var max = {
    degree:360,
    hour:24,
    minute:60,
    second:60,
    speed: 250
}

/**
 * @Called when update clock need (every clock-second)
 *      @At (Caller Function)
 *      @When (When it activates)
 * @Do Check if the number has the desired length and add zeros at the start if it don't
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
 * @Called When the angle of a pointer need to be calculated (every clock second)
 * @Do Get the angle of rotation based on the period of the cycle
 * @param {Number} currentlyTime the currently period of the cycle 
 * @param {Number} cycleMax   the cycle max value
 * @returns the angle of the currently period
 */
export function parseAngle(currentlyTime,cycleMax) {
    return (currentlyTime/cycleMax)*max.degree
}

/**
 * @Called When the numbers and bars position are set
 * @Do Convert A position in polar coordination to cardinal coordination
 * @param {Number} radius radius of the coordinate
 * @param {Number} deg degree of the angle
 * @returns The cardinal coordinates
 */
export function polarToCardinal(radius, deg) {
    let theta = (2 * Math.PI) / (max.degree/deg)
    let x = (Math.sin(theta)*radius)
    let y = (Math.cos(theta)* radius)
    return {x:x,y:y}
}

/**
 * @Called When a bar is rotated
 * @Do Rotates the element relative to mid-top of itself
 * @param {Element} element 
 * @param {Number} deg 
 */
export function rotateElement(element, deg) {
    element.style.transform = `rotate(${deg}deg)`
}

/**
 * @Called When a bar or a number is positioned
 * @Do Position the element relative to the center of the analog clock
 * @param {Element} element the element to be positioned 
 * @param {Number} x X position relative to the center of the analog clock in pixels 
 * @param {Number} y Y position relative to the center of the analog clock in pixels
 */
export  function positionElement(element, x, y) {
    element.style.top = `calc(50% + ${x}px)`
    element.style.left = `calc(50% + ${y}px)`
}

export function write(element,string) {
    element.innerText = string
}