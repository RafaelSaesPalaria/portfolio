/**
 * @Called: When the earth need to update it's background
 * @Do: Convert polar coordinates to cardinal coordinates
 * @param {Number} deg    degree of the coordinate
 * @param {Number} radius distance from the center
 * @returns x, y as hash
 */
function polarToCardinal(deg, radius) {
    let theta = (Math.PI * 2) / (360/deg)

    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    return {x:x,y:y}
}