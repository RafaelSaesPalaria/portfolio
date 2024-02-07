import { updateTimeSpeed } from "./digital_clock.js";
export var timeDirection = 1
export var timeSpeed     = 1
export var time = new Date();


/**
 * Called: When the fast_rewind button is pressed
 * Do: fast_rewind the interval
 */
function fast_rewind() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=-1;
    timeSpeed*=1.1;
}

/**
 * Called: When the pause button is pressed
 * Do: Pause the interval
 */
function pause() {
    timeSpeed=0
}

/**
 * Called: When the play button is pressed
 * Do: restart the time speed
 */
function play() {
    timeSpeed=1
    timeDirection=1
}

/**
 * Called: When the backward button is pressed
 * Do: Go back in time
 */
function backward() {
    timeDirection=-1
    timeSpeed=1
}

/**
 * Called: When the accelerate button is pressed
 * Do: Accelerate the interval
 */
function accelerate() {
    if (timeSpeed==0) {timeSpeed=1}
    timeDirection=1;
    timeSpeed*=1.1;
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
        console.log(state.observers)
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