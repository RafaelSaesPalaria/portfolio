/**
 * @param {Number} min 
 * @param {Number} max 
 * @returns random value between min and max
 */
export function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}