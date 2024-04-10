var menuDisplay = true;

let content = {
    items: document.querySelectorAll("nav a.item"),
    icon: document.querySelector("nav a#icon")
}

/**
 * @Called When the menu icon is clicked
 * @Do toggle the itens visibility
 */
function onClickMenu() {
    if (menuDisplay) {
        showItems(false)
    } else {
        showItems(true);
    }
    menuDisplay = !menuDisplay;
}

/**
 * @Called When the screen is resized
 * @Do show de itens and hide the icon button the its wide then a mobile screen
 */
function resize() {
    if (window.innerWidth>=768) {
        showItems(true);
        showElement(content.icon,false)
        menuDisplay = true
    } else {
        showElement(content.icon,true)
    }
}

/**
 * @Called When the icon change (resize/click)
 * @Do apply the change to all of the items
 * @param {boolean} show if it shows the icons
 */
function showItems(show) {
    content.items.forEach(element => {
        showElement(element,show)
    });
}

/**
 * @Called When a the screen is resized or the icon is clicked
 * @Do Change the visibility of a element
 * @param {HTMLElement} element 
 * @param {boolean} show 
 */
function showElement(element, show) {
    element.style.display = show ? "block" : "none"
}

/**
 * @Called at the start of the program
 * @Do Initialize the methods/listeners
 */
init()
function init() {
    resize()
    onClickMenu()
    content.icon.addEventListener("click",onClickMenu)
    document.body.addEventListener("resize",resize)
}