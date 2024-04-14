import { polarToCardinal, parseAngle, rotateElement, positionElement, max } from "./util.js";
import { getTime, timeType } from "./time.js";

export var analogic_clock = {
    elements: {
        numbers: document.querySelector("div#numbers"),
        bars: document.querySelector("div#bars"),
        pointers: {
            hour: document.querySelector("div.pointer#hours"),
            minute: document.querySelector("div.pointer#minutes"),
            second: document.querySelector("div.pointer#seconds")
        }
    },
    numbers: {
        radius: 95,
        amount: (max.hour),
    },
    bars: {
        radius: 110,
        amount: max.minute
    }
}

/**
 * @Called At the start of the application or when the application is zoomed
 * @Do Create and position the numbers elements
 * @param {Number} qntNumbers amount of numbers to be displayed on the clock
 * @param {Number} radius distance from the center
 */
export function setNumbersPosition(radius, qntNumbers) {
    for (let i=1;i<=qntNumbers;i++) {
        let deg = parseAngle(i,qntNumbers)
        let n = createElement(radius,deg+270)
        n.innerText = `${i}`

        analogic_clock.elements.numbers.appendChild(n)
    }
}

/**
 * @Called at the start of the application or when the application is zoomed
 * @Do Create the bars of the minutes and positions it's elements
 * @param {Number} radius distance from the center
 * @param {Number} numBars amount of bars to be displayed at the clock
 * @param {Number} thickBars how many minutes per thickBar (default = 5)
 */
export function addMinuteBar(radius, numBars, thickBars=5) {
    for (let i=0;i<numBars;i++) {
        let deg = parseAngle(i,numBars)
        let bar = createElement(radius, deg+270)
        rotateElement(bar,deg-270)

        if (i%thickBars==0) {bar.classList.add("thick")}
        analogic_clock.elements.bars.appendChild(bar)
    }
}

/**
 * @Called When a element is created
 * @Do Create and configure a element position
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
 * @Called At every clock-second
 * @Do rotate the pointers
 */
export function rotatePointers() {
    for (let pointer in analogic_clock.elements.pointers) {
        rotateElement(
            analogic_clock.elements.pointers[pointer],
            parseAngle(
                getTime(timeType[pointer]),
                max[pointer])
            +180)
    }
}