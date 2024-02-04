/**
 * Called: when the digital clock changes
 * Do: change the player from lightmode to nightmode when needed
 */

import { time } from "./script.js";

export function daynightmodePlayer() {
    let digitalclock = document.querySelector("div#digital-clock")
    let timed = document.querySelector("span#time");
    let times = document.querySelector("span#timespeed")
    let players = document.querySelectorAll("div#player span")
    let color1 = "white";
    let color2 = "black"

    if (time.getHours()>=18 || time.getHours()<6) {
        let aux = color1;
        color1 = color2
        color2 = aux
    }

    digitalclock.style.background = `${color1}`
    digitalclock.style.borderColor = `${color2}`
    timed.style.color = `${color2}`
    times.style.color = `${color2}`
    players.forEach(player => {
        player.style.background = `${color1}`
        player.style.borderColor = `${color2}`
        player.style.color = `${color2}`
    }) 
}