var menuDisplay = true;

let content = {
    items: document.querySelectorAll("nav .item"),
    icon: document.querySelector("nav #icon")
}

function clickMenu() {
    if (menuDisplay) {
        showItems(false)
    } else {
        showItems(true);
    }
    menuDisplay = !menuDisplay;
}

function adjustToSize() {
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

clickMenu()