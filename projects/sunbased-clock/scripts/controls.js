import { updateTimeSpeed } from "./digital_clock.js";
import { timeData } from "./script.js";
/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
function fast_rewind() {
    if (timeData.speed==0) {timeData.speed=1}
    timeData.direction=-1;
    timeData.speed*=1.1;
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
function pause() {
    timeData.speed=0
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
function play() {
    timeData.speed=1
    timeData.direction=1
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
function backward() {
    timeData.direction=-1
    timeData.speed=1
}

/**
 * Called: When the accelerate button is pressed
 * Do: Accelerate the interval
 */
function accelerate() {
    if (timeData.speed==0) {timeData.speed=1}
    timeData.direction=1;
    timeData.speed*=1.1;
}

/**
 * ERROR/TODO this class is gonna create the same listeners multiple times
 * Called: by the update time speed
 * Do: Add all the buttons to the listener
 * @returns the subscription
 */
export function addButtonListener() {
    const state = {
        observers : []
    }

    addEventListenerToButton("span#accelerate",accelerate)
    addEventListenerToButton("span#play",play)
    addEventListenerToButton("span#pause",pause)
    addEventListenerToButton("span#backward",backward)
    addEventListenerToButton("span#fast_rewind",fast_rewind)

    /**
     * Called: by the listener
     * Do: Subscribe the listener
     * @param {Function} command 
     */
    function subscribe(command) {
        state.observers.push(command)
    }

    /**
     * Called: When any button is pressed
     * Do: Execute every observer function
     */
    function notifyAll() {
        state.observers.forEach(observer => {
            observer()
        })
    }

    /**
     * Called: When a Listener is created
     * Do: Execute the observers when a listener is executed
     * @param {String} querySelector The Selector of the element that will have the listener
     * @param {Function} method The method to be executed
     */
    function addEventListenerToButton(querySelector, method) {
        document.querySelector(querySelector).addEventListener("click", () => {
            method()
            notifyAll()
        })
    }

    return {
        subscribe
    }
}