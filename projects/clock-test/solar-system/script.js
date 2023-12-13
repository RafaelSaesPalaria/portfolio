function start() {
    createStars();
}

function createStars() {
    for (n=0;n<200;n++) {
        window.document.getElementById("stars").innerHTML += '<div class="star" id=star-'+n+'></div>';

        window.document.getElementById("star-"+n).style.top = (Math.random()*100)+"%";
        window.document.getElementById("star-"+n).style.left = (Math.random()*100)+"%";
    }
}