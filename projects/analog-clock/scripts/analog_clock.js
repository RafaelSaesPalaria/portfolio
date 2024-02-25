import { polarToCardinal, rotatePointer, parseAngle } from "./util.js";
import { timeData } from "./time.js";

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
        let n = createNumber(i,radius,qntNumbers)
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
        let bar = createBar(i,radius,nbars)

        if (i%5==0) {
            bar.classList.add("five")
        }

        bars.appendChild(bar)
    }
}


/**
 * Called: When a number is created
 * Do: Create and configure a number position
 * @param {Number} i the index of the number
 * @param {Number} radius distance from the center
 * @param {Number} qntNumbers the total amount of numbers (for angle purporses)
 * @returns The span element of the number
 */
function createNumber(i,radius,qntNumbers){
    let num = document.createElement("div");
    num.innerText = `${i}`
    let deg = parseAngle(i,qntNumbers)
    let coords= polarToCardinal(radius,deg+270)
    positionElement(num,coords.x,coords.y)
    return num
}

/**
 * Called: When a bar is created
 * Do: Create and configure a bar position
 * @param {Number} i the index of the bar
 * @param {Number} radius distance from the center
 * @param {Number} qntNumbers the total amount of bar (for angle purporses)
 * @returns The span element of the bar
 */
function createBar(i, radius, qntNumbers) {
    let bar = document.createElement("div")
    let deg = parseAngle(i,qntNumbers)
    let coords= polarToCardinal(radius,deg)
    positionElement(bar,coords.x, coords.y)
    rotateElement(bar,deg)
    return bar
}

/**
 * Called: At every clock-second
 * Do: rotate the pointers
 */
export function rotatePointers() {
    rotatePointer(analogic_clock.elements.pointers.hours,
        parseAngle(getTime(3),12)+180)
    rotatePointer(analogic_clock.elements.pointers.minutes,
        parseAngle(getTime(2),60)+180)
    rotatePointer(analogic_clock.elements.pointers.seconds,
        parseAngle(getTime(1),60)+180)
}


/**
 * Called: When the pointers rotate
 * Do: Get the time type in seconds precision
 * @param {Number} type the type of the time [3 = Hours, 2 = Minutes, 1 = Seconds]
 * @returns the time in the type
 */
function getTime(type) {
    let time = [
        timeData.time.getSeconds(),
        timeData.time.getMinutes(),
        timeData.time.getHours()]
    let totalTime=0
    for (let i=0; i<type;i++) {
        totalTime/=60
        totalTime+=time[i]
    }
    return totalTime
}

/**
 * Called: When a bar or a number is positioned
 * Do: Position the element relative to the center of the analog clock
 * @param {Element} element the element to be positioned 
 * @param {Number} x X position relative to the center of the analog clock in pixels 
 * @param {Number} y Y position relative to the center of the analog clock in pixels
 */
function positionElement(element, x, y) {
    element.style.top = `calc(50% + ${x}px)`
    element.style.left = `calc(50% + ${y}px)`
}

/**
 * Called: When a bar is rotated
 * Do: Rotates the element relative to mid-top of itself
 * @param {Element} element 
 * @param {Number} deg 
 */
function rotateElement(element, deg) {
    element.style.transform = `rotate(${deg}deg)`
}