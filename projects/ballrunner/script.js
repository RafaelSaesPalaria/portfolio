//Global Variables
var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

import { Player, Enemy, Point, entities } from "./entities.js";
import { game, canvasSize, updateScoreSpan } from "./game.js";

export var components = {
    end : {
        panel: document.querySelector("div#end"),
        time: document.querySelector("div#end span#time"),
    },
    scoreboard : {
        highscore: document.querySelector("div#scoreboard span#highscore"),
        score: document.querySelector("div#scoreboard span#score")
    }
}

/**
 * Called: by itself at every 1 second
 * Do: add 1 to game.time
 */
setInterval(countTime,1000)
function countTime() {
    game.time+=1
}

/**
 * Called: When a enemy touch the player
 * Do: Pause the game and show the death panel with the currently time and score
 */
export function showDeathMessage() {
    game.alive = false
    components.end.panel.style.display = "block"
    components.end.time.innerText = `${game.time} Seconds\n${game.score} Points`
}

/**
 * Called: When the player click on the restart button (after die)
 * Do: hide the death message
 */
function hideDeathMessage() {
    components.end.panel.style.display = "none"
}
 
/**
 * Called: When the game start/restart
 * Do: Set the initial values of the game and start the game
 */
export function init() {
    game.time = 0
    game.score = 0
    game.alive = true
    hideDeathMessage()
    resize()
    updateScoreSpan()
    entities.enemys = []
    entities.players = []
    entities.points = []
    entities.players.push(new Player  (200, canvas.height-30 ,30))
    entities.enemys.push(new Enemy(30,30,25))
    entities.enemys.push(new Enemy(30,30,25))
    entities.points.push(new Point    (30,30, 20))
    animate()
}

/**
 * Called: When the screen resizes or the game start
 * Do: change the size of the canvas
 */
addEventListener("resize",resize)
function resize() {
    canvas.width = innerWidth*0.95
    canvas.height= innerHeight*0.7
    canvasSize.width = canvas.width
    canvasSize.height= canvas.height
}

/**
 * Called: When the game start or when the frame updates
 * Do: Update the entities and clear the screen
 */
function animate() {
    if (game.alive) {
        c.clearRect(0,0,canvas.width,canvas.height)
        requestAnimationFrame(animate)

        entities.enemys.forEach(enemy =>{
            enemy.update(c)
        })

        entities.players.forEach(player =>{
            player.update(c)
        })

        entities.points.forEach(point => {
            point.update(c)
        })

    }
}

init()