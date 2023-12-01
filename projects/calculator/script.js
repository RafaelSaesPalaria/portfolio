var main = document.querySelector("main");

function start() {
    createComponents();
}

function createComponents() {
    for (y = 0 ; y < 3 ; y++) {
        for (x = 0 ; x < 3 ; x++) {
            createButton(1+(y*3)+x);
        }
    }
}

function createButton(txt) {
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value",txt);
    button.setAttribute("onclick",`onClick_number(${txt})`)

    main.appendChild(button)
}

function onClick_number(number) {
    document.write(number)
}