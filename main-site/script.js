var menuDisplay = true;

let content = {
    items: document.querySelectorAll("nav .item"),
    icon: document.querySelector("nav #icon")
}

function clickMenu() {
    if (menuDisplay) {
        content.items.forEach(element => {
            element.style.display = "none";
        });
    } else {
        openMenu();
    }
    menuDisplay = !menuDisplay;
}

function adjustToSize() {
    if (window.innerWidth>=768) {
        openMenu();
        content.icon.style.display = "none"
    } else {
        content.icon.style.display = "block"
    }
}

function openMenu() {
    content.items.forEach(element => {
        element.style.display = "block";
    });
}

clickMenu()