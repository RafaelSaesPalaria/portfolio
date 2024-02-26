import { polarToCardinal, parseAngle, rotateElement, positionElement } from "./util.js";
import { getTime } from "./time.js";

var analogic_clock = {
    elements: {
        numbers: document.querySelector("div#numbers"),
        bars: document.querySelector("div#bars"),
        pointers: {
            hours: document.querySelector("div.pointer#hours"),
            minutes: document.querySelector("div.pointer#minutes"),
            seconds: document.querySelector("div.pointer#seconds")
        }
    }
}

setNumbersPosition((0.19*500), 12)
addMinuteBar((0.22*500), 60)

/**
 * Called: At the start of the application or when the application is zoomed
 * Do: Create and position the numbers elements
 * @param {Number} qntNumbers amount of numbers to be displayed on the clock
 * @param {Number} radius distance from the center
 */
export function setNumbersPosition(radius, qntNumbers) {
    for (let i=1;i<=qntNumbers;i++) {
        //let n = createNumber(i,radius,qntNumbers)
        let deg = parseAngle(i,qntNumbers)
        let n = createElement(radius,deg+270)
        n.innerText = `${i}`
        analogic_clock.elements.numbers.appendChild(n)
    }
}

/**
 * Called: at the start of the application or when the application is zoomed
 * Do: Create the bars of the minutes and positions it's elements
 * @param {Number} nbars amount of bars to be displayed at the clock
 * @param {Number} radius distance from the center
 */
export function addMinuteBar(radius, nbars) {
    let bars = analogic_clock.elements.bars
    for (let i=0;i<nbars;i++) {
        //let bar = createBar(i,radius,nbars)
        let deg = parseAngle(i,nbars)
        let bar = createElement(radius, deg)
        rotateElement(bar,deg)

        if (i%5==0) {
            bar.classList.add("five")
        }

        bars.appendChild(bar)
    }
}

/**
 * Called: When a element is created
 * Do: Create and configure a element position
 * @param {Number} i the index of the element
 * @param {Number} radius distance from the center
 * @param {Number} deg the total amount of element (for angle purporses)
 * @returns The span element of the element
 */
function createElement(radius, deg) {
    let element = document.createElement("div")
    let coords= polarToCardinal(radius,deg)
    positionElement(element,coords.x, coords.y)
    return element
}
/**
 * Called: At every clock-second
 * Do: rotate the pointers
 */
export function rotatePointers() {
    rotateElement(analogic_clock.elements.pointers.hours,
        parseAngle(getTime(3),12)+180)
    rotateElement(analogic_clock.elements.pointers.minutes,
        parseAngle(getTime(2),60)+180)
    rotateElement(analogic_clock.elements.pointers.seconds,
        parseAngle(getTime(1),60)+180)
}