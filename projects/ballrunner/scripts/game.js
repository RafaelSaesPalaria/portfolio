import { components } from "./script.js"

export var game = {
    alive: true,
    time: 0,
    score: 0,
    highscore: 0,
    canvas: document.querySelector("canvas"),
    c: document.querySelector("canvas").getContext("2d")
}

/**
 * @Called: When a point is adquired
 * @Do: Update the value of the scoreboard
 */
export function updateScoreSpan() {
    components.scoreboard.highscore.innerText = `Highscore: ${game.highscore}`
    components.scoreboard.score.innerText = `Score: ${game.score}`
}