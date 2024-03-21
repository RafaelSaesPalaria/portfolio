/**
 * @Called: When any non-farway-star is called
 * @Do: Center the currently star
 * @param {Object} star the star that's gonna be centered
 */
export function center(star) {
    sun.style.left = `${(innerWidth/2)  - star.offsetLeft+sun.offsetLeft}px`
    sun.style.top = `${(innerHeight/2) - star.offsetTop+sun.offsetTop}px`
}

/**
 * @Called: When a star is centered
 * @Do: Rotate the obj
 * @param {Object} element object to be rotated
 * @param {Number} position degree of rotation 
 */
export function rotateElement(element, position) {
    element.style.transform = `translateY(-25%) rotate(${position%360}deg)`;
}

/**
 * @Called: When the earth need to update it's background
 * @Do: Convert polar coordinates to cardinal coordinates
 * @param {Number} deg    degree of the coordinate
 * @param {Number} radius distance from the center
 * @returns x, y as hash
 */
export function polarToCardinal(deg, radius) {
    let theta = (Math.PI * 2) / (360/deg)

    let x = Math.cos(theta) * radius;
    let y = Math.sin(theta) * radius;
    return {x:x,y:y}
}