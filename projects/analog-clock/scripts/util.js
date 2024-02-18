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