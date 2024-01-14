var main = document.querySelector("main");

var value = Number();
var lastOperator = "+"
var firstDecimal = false

var normalCalculator = [[                   "+"],
                                                      ["7","8","9"   ,"-"],
                                                      ["4","5","6"   ,"*"],
                                                      ["3","2","1"   ,"/"],
                                                      [">","0","del","="]]

/*KeyListener Observer
    listen the keydown and 
*/
function addKeyListener() {
    const state = {
        observers: []
    }
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command.key)
        }
    }

    addEventListener("keydown",keyhandler)

    function keyhandler(event) {
        notifyAll(event)
    }

    return {
        subscribe
    }

}

/**
 * Create and put the buttons on the screen
 * @param {String} calculator the button set to be created 
 */
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

/**
 * Create formated buttons [Factory]
 * @param {String} txt text exhibited by the button 
 * @returns 
 */
function createButton(txt) {
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value",txt);
    main.appendChild(button);
    return button;
}

/*Create the textField Element*/
function createTextField() {
    let txtField = document.createElement("input");
    txtField.setAttribute("type","number")
    txtField.setAttribute("id","txtResult")
    txtField.setAttribute("readonly","readonly")
    main.appendChild(txtField)
    return txtField
}

/**
 * Detect if the key is a number
 * @param {String} s the key that's gonna be tested 
 */
function isNumeric(s) {
    return /^[0-9]+$/.test(s);
}

/**
 * Receive the keydown/button press and separate numbers from operators
 * @param {String} txt the key/button
 */
function onClick(txt) {
    if (isNumeric(txt)) {
        onClick_number(txt)
    } else {
        onClick_operator(txt)
    }
}

/**
 * Write the number on the textfield
 * @param {Number} number the number pressed (by the button or by the keys) 
 */
function onClick_number(number) {
    if (firstDecimal) {
        number= "."+number
    }
    document.querySelector(`input[type="number"]#txtResult`).value+=number;
    firstDecimal=false
}

   /**
    * Operators select and execute the non-aritmethic operators, and execute the onClick aritimethic operators method
    * @param {String} operator the operator used to change the numbers or to perform a calculation 
    */
function onClick_operator(operator) {
    let textField = document.querySelector(`input[type="number"]#txtResult`);

    switch (operator) {
        case ".":
        case ",":
            firstDecimal= true
            break;
        case ">":
        case "Backspace":
            textField.value = textField.value.substring(0,textField.value.length-1)
            break;
        case "del":
        case "Delete":
            textField.value = ""
            break;
        default:
            aritmeticOperator(operator);
            break;
    }
}

/**
 * Execute the aritmethic operators and put the value into the textField
 * @param {String} operator operator used in the calculation 
 */
function aritmeticOperator(operator) {
    let textField = document.querySelector(`input[type="number"]#txtResult`);

    if (!(operator === "=" || operator === "Enter")) {
        lastOperator = operator
    }

    if (value.length===undefined) {
        value = textField.value;
        textField.value = null;
    } else {
        switch (lastOperator) {            
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
                textField.value = Number(value) + Number(textField.value)
            default:
                break;
        }
        value = Number()
    }
}

var listener = addKeyListener()
listener.subscribe(onClick);

/*Called when the system start, create the components*/
function start() {
    createComponents(normalCalculator);
}