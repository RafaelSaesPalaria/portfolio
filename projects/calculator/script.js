var main = document.querySelector("main");

var value = Number();
var lastOperator = "+"

var normalCalculator = [[                   "+"],
                                                      ["7","8","9"   ,"-"],
                                                      ["4","5","6"   ,"*"],
                                                      ["3","2","1"   ,"/"],
                                                      [">","0","del","="]]

function start() {
    createComponents(normalCalculator);
}

function createComponents(calculator) {
    createTextField()
    for (y = 0 ; y < calculator.length ; y++) {
        for (x = 0 ; x < calculator[y].length ; x++) {
            let button = createButton(calculator[y][x]);
                button.setAttribute("onclick",`onClick('${calculator[y][x]}')`);
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
    txtField.setAttribute("id","txtResult")
    txtField.setAttribute("readonly","readonly")
    main.appendChild(txtField)
    return txtField
}

function isNumeric(s) {
    return /^[0-9]+$/.test(s);
}

function onClick(txt) {
    if (isNumeric(txt)) {
        onClick_number(txt)
    } else {
        onClick_operator(txt)
    }
}

function onClick_number(number) {
    document.querySelector(`input[type="number"]#txtResult`).value+=number;
}

function onClick_operator(operator) {
    let textField = document.querySelector(`input[type="number"]#txtResult`);

    switch (operator) {
        case ">":
            textField.value = textField.value.substring(0,textField.value.length-1)
            break;
        case "del":
            textField.value = ""
            break;
        default:
            if (value.length===undefined) {
                value = textField.value;
                textField.value = null;
            } else {
                if (!(operator === "=")) {
                    lastOperator = operator
                }
                switch (operator) {            
                    case "-":
                        textField.value = Number(value) - Number(textField.value)
                        break;
                    case "*":
                        textField.value = Number(value) * Number(textField.value)
                        break;
                    case "/":
                        textField.value = Number(value) / Number(textField.value)
                        break;
                    case "+":
                    default:
                        textField.value = Number(value) + Number(textField.value)
                        break;
                }
                value = Number()
            break;
        }
    }
}