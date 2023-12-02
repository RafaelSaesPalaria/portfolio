var main = document.querySelector("main");

var value = Number();

var normalCalculator = [[                   "="],
                                                      ["7","8","9"   ,"+"],
                                                      ["4","5","6"   ,"-"],
                                                      ["3","2","1"   ,"*"],
                                                      [">","0","del","/"]]

function start() {
    createComponents(normalCalculator);
}

function createComponents(calculator) {
    createTextField()
    for (y = 0 ; y < calculator.length ; y++) {
        for (x = 0 ; x < calculator[y].length ; x++) {
            let button = createButton(calculator[y][x]);
            button.setAttribute("onclick",`onClick(${calculator[y][x]})`);
        }
        main.appendChild(document.createElement("br"));
    }
}

function createButton(txt) {
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value",txt);
    main.appendChild(button);
    return button;
}

function createTextField() {
    let txtField = document.createElement("input");
    txtField.setAttribute("type","number")
    txtField.setAttribute("id","txtFieldResult")
    main.appendChild(txtField)
    return txtField
}

function onClick(txt) {
    window.alert("clicked")
    if (typeof(txt)==="number") {
        window.alert("number "+txt)
    }
    if (value.length===undefined) {
        window.alert("a")
    }
}