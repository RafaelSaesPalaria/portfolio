var menuDisplay = true;

function clickMenu() {
    let menuItems = document.querySelectorAll("nav .item");

    if (menuDisplay) {
        menuItems.forEach(element => {
            element.style.display = "none";
        });
    } else {
        openMenu();
    }
    menuDisplay = !menuDisplay;
}

function resize() {
    if (window.innerWidth>=768) {
        openMenu();
        document.querySelector("nav #icon").style.display = "none"
    } else {
        document.querySelector("nav #icon").style.display = "block"
    }
    
    
}

function openMenu() {
    let menuItems = document.querySelectorAll("nav .item");
    
    menuItems.forEach(element => {
        element.style.display = "block";
    });
}