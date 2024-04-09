var menuDisplay = true;

let content = {
    items: document.querySelectorAll("nav .item"),
    icon: document.querySelector("nav #icon")
}

function clickMenu() {
    if (menuDisplay) {
        content.items.forEach(element => {
            showElement(element,false)
        });
    } else {
        openMenu();
    }
    menuDisplay = !menuDisplay;
}

function adjustToSize() {
    if (window.innerWidth>=768) {
        openMenu();
        showElement(content.icon,false)
        menuDisplay = true
    } else {
        showElement(content.icon,true)
    }
}

function openMenu() {
    content.items.forEach(element => {
        showElement(element,true)
    });
}

function showElement(element, show) {
    element.style.display = show ? "block" : "none"
}

clickMenu()