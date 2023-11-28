let clicks=0;
function startGame() {
    createBlocks();
}

function createBlocks() {
    level = window.document.getElementById("level");
    for (y=0;y<10;y++) {
        container = document.createElement("div")
        container.classList.add("container")
        for (x=0;x<10;x++) {
            block = document.createElement("div");
            block.classList.add("block")
            block.setAttribute("onclick","clickBlock()")
            container.appendChild(block)
        }
        level.appendChild(container)
    }
}

function clickBlock() {
    if (clicks==0) {
        alert("bloco clicado!, primeira vez");
     } else {
        alert("bloco clicado!, Clique n: "+(clicks+1));
    }
    clicks++;
}

function putBombs() {
    for (y=0;y<10;y++) {
        container = document.querySelector("div.container") [y]
        for (x=0;x<10;x++) {
            block = document.querySelector("div.block")[x];
            block.classList.add("block")
            block.setAttribute("onclick","clickBlock()")
            container.appendChild(block)
        }
        level.appendChild(container)
    }
}