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