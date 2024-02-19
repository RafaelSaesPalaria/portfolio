import { polarToCardinal, rotatePointer, parseAngle } from "./util.js";
import { timeData } from "./time.js";

setNumbersPosition((0.19*500), 12)
addMinuteBar((0.22*500), 60)

/**
 * Called: At the start of the application or when the application is zoomed
 * Do: Create and position the numbers elements
 * @param {Number} qntNumbers amount of numbers to be displayed on the clock
 * @param {Number} radius distance from the center
 */
export function setNumbersPosition(radius, qntNumbers) {
    let div = document.querySelector("div#numbers")
    div.innerHTML = '';

    for (let i=1;i<=qntNumbers;i++) {
        
        let n = document.createElement("span");
        n.setAttribute("id",`n${i}`)
        n.innerHTML = `${i}`
        
        let coords= polarToCardinal(radius,(i*(360/qntNumbers))+270)
        n.style.top = `calc(50% + ${coords.x}px)`;
        n.style.left = `calc(50% + ${coords.y}px)`

        div.appendChild(n)
    }
}

/**
 * Called: at the start of the application or when the application is zoomed
 * Do: Create the bars of the minutes and positions it's elements
 * @param {Number} nbars amount of bars to be displayed at the clock
 * @param {Number} radius distance from the center
 */
export function addMinuteBar(radius, nbars) {
    let bars = document.querySelector("div#bars")
    bars.innerHTML = '';

    for (let i=0;i<nbars;i++) {
        let bar = document.createElement("div")

        if (i%5==0) {
            bar.style.width = "1.2vh"
        }

        let coords = polarToCardinal(radius,i*(360/nbars)+270)

        bar.style.top = `calc(50% + ${coords.x}px)`
        bar.style.left = `calc(49% + ${coords.y}px)`

        bar.style.transform = `rotate(${i*(360/nbars)+90}deg)`

        bars.appendChild(bar)
    }
}

/**
 * Called: At every clock-second
 * Do: rotate the pointers
 */
export function rotatePointers() {
    //Pointers  [0] = Hours, [1] = Minutes, [2] = Seconds
    let pointers = document.querySelectorAll("div.pointer")

    rotatePointer(pointers[0],parseAngle(timeData.time.getHours()+(timeData.time.getMinutes()/60),12)+180)
    rotatePointer(pointers[1],parseAngle(timeData.time.getMinutes()+(timeData.time.getSeconds()/60),60)+180)
    rotatePointer(pointers[2],parseAngle(timeData.time.getSeconds(),60)+180)
}