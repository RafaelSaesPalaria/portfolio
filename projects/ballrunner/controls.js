/**
 * @Called: When the player is created
 * @Do: execute all the methods that are subscribed when a keyup or a keydown happens
 * @returns the subscribe method
 */
export function addKeyListener() {
    const state = {
        observers : []
    }

    addEventListener("keyup",notifyAll)
    addEventListener("keydown",notifyAll)

    /**
     * @Called: When the player is created
     * @Do: Add the function to the state.observers array
     * @param {Function} functionObserver the function to be executed
     */
    function subscribe(functionObserver) {
        state.observers.push(functionObserver)
    }

    /**
     * @Called: When a keyup/keydown happens
     * @Do: Execute all methods in state.observers
     * @param {Object} command the keyboard event
     */
    function notifyAll(command) {
        state.observers.forEach(functionObserver => {
            functionObserver(command)
        })
    }

    return {
        subscribe       
    }
}

/**
 * @Called: When the player is created
 * @Do: execute all the methods that are subscribed when a touchmove/touchstart happens
 * @returns the subscribe method
 */
export function addTouchListener() {
    const state = {
        observers : []
    }

    addEventListener("touchmove",notifyAll)
    addEventListener("touchstart",notifyAll)

    /**
     * @Called: When the player is created
     * @Do: Add the function to the state.observers array
     * @param {Function} functionObserver the function to be executed
     */
    function subscribe(functionObserver) {
        state.observers.push(functionObserver)
    }

    /**
     * @Called: When a keyup/keydown happens
     * @Do: Execute all methods in state.observers
     * @param {Object} command the keyboard event
     */
    function notifyAll(command) {
        state.observers.forEach(functionObserver => {
            functionObserver(command)
        })
    }

    return {
        subscribe       
    }
}