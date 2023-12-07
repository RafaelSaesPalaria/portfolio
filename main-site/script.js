var menuDisplay = true;
var iframe_pages = document.querySelector("iframe#show-pages")

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

function adjustToSize() {
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

/*function showWeb() {
    iframe_pages.src="main-site/pages/web.html"
}

function showJava() {
    iframe_pages.src="main-site/pages/java.html"
}

function showPython() {
    iframe_pages.src="main-site/pages/python.html"
}*/