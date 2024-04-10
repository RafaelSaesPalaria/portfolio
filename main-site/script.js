var menuDisplay = true;

let content = {
    items: document.querySelectorAll("nav a.item"),
    icon: document.querySelector("nav a#icon")
}

/**
 * 
 */
function onClickMenu() {
    if (menuDisplay) {
        showItems(false)
    } else {
        showItems(true);
    }
    menuDisplay = !menuDisplay;
}

function resize() {
    if (window.innerWidth>=768) {
        showItems(true);
        showElement(content.icon,false)
        menuDisplay = true
    } else {
        showElement(content.icon,true)
    }
}

function showItems(show) {
    content.items.forEach(element => {
        showElement(element,show)
    });
}

function showElement(element, show) {
    element.style.display = show ? "block" : "none"
}

init()
function init() {
    resize()
    onClickMenu()
    content.icon.addEventListener("click",onClickMenu)
    document.body.addEventListener("resize",resize)
}