//Global Variables
import { Player, Enemy, Point, entities } from "./entities.js";
import { game, updateScoreSpan } from "./game.js";

export var components = {
    end : {
        panel: document.querySelector("div#end"),
        time: document.querySelector("div#end span#time"),
        continue: document.querySelector("div#end a")
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
    components.end.panel.style.display = "block"
    components.end.continue.addEventListener("click",init)
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
    entities.players.push(new Player  (200, game.canvas.height-30 ,30))
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
    game.canvas.width = innerWidth*0.95
    game.canvas.height= innerHeight*0.7
}

/**
 * Called: When the game start or when the frame updates
 * Do: Update the entities and clear the screen
 */
function animate() {
    if (game.alive) {
        game.c.clearRect(0,0,game.canvas.width,game.canvas.height)
        requestAnimationFrame(animate)

        entities.enemys.forEach(enemy =>{
            enemy.update(game.c)
        })

        entities.players.forEach(player =>{
            player.update(game.c)
        })

        entities.points.forEach(point => {
            point.update(game.c)
        })

    }
}

init()