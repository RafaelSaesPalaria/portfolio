const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

var i=0

function start() {
    createStars();
    earthCentered()
}

setInterval(earthCentered,10)
function earthCentered() {
    let sun = document.querySelector("div#sun")
    let earth = document.querySelector("div#earth")
    let moon = document.querySelector("div#moon")

    orbit(sun   ,earth,i*0.4,vh*0.4)
    orbit(earth,moon,i*0.4,vh*0.4)

    i+=1
}

function orbit(centerObj,satelliteObj,deg,radius) {

    let theta = (Math.PI*2)/360
    let orbitX = Math.sin(theta*deg)*radius
    let orbitY = Math.cos(theta*deg)*radius

    //let centerX = centerObj.width()  - centerObj.offset().left();
    //let centerY = centerObj.height() - centerObj.offset().top();

    let centerX = 50
    let centerY = 50

    satelliteObj.style.top = `calc(${centerY}% + ${orbitY}px)`
    satelliteObj.style.left = `calc(${centerX}% + ${orbitX}px)`
    satelliteObj.style.backgroundColor="red"
}

function createStars() {
    for (n=0;n<200;n++) {
        window.document.getElementById("stars").innerHTML += '<div class="star" id=star-'+n+'></div>';

        window.document.getElementById("star-"+n).style.top = (Math.random()*100)+"%";
        window.document.getElementById("star-"+n).style.left = (Math.random()*100)+"%";
    }
}