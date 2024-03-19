var main = document.querySelector("main");

var value = Number();
var lastOperator = "+"
var firstDecimal = false

var normalCalculator = [[                   "+"],
                                                      ["7","8","9"   ,"-"],
                                                      ["4","5","6"   ,"*"],
                                                      ["3","2","1"   ,"/"],
                                                      [">","0","del","="]]

/**
 * @Do: KeyListener Observer
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
 * @Do: Create and put the buttons on the screen
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
 * @Do: Create formated buttons [Factory]
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

/*@Do: Create the textField Element*/
function createTextField() {
    let txtField = document.createElement("input");
    txtField.setAttribute("type","number")
    txtField.setAttribute("id","txtResult")
    txtField.setAttribute("readonly","readonly")
    main.appendChild(txtField)
    return txtField
}

/**
 * @Do: Detect if the key is a number
 * @param {String} s the key that's gonna be tested
 * @returns if the key is a number 
 */
function isNumeric(s) {
    return /^[0-9]+$/.test(s);
}

/**
 * @Do: Detect if the key is a aritmethic operator
 * @param {*} s the key that's gonna be tested
 * @returns if the key if a aritmethic operator
 */
function isAritmethicOperator(s) {
    return /[+\-*\/]/.test(s);
}



/**
 * @Do: Receive the keydown/button press and separate numbers from operators
 * @param {String} txt the key/button
 */
function onClick(txt) {
    if (isNumeric(txt)) {
        number(txt)
    } else if (isAritmethicOperator(txt)){
        aritmeticOperator(txt)
    } else {
        operator(txt)
    }
}

/**
 * @Do: Write the number on the textfield
 * @param {Number} number the number pressed (by the button or by the keys) 
 */
function number(number) {
    if (firstDecimal) {
        number= "."+number
    }
    document.querySelector(`input[type="number"]#txtResult`).value+=number;
    firstDecimal=false
}

   /**
    * @Do: Operators select and execute the non-aritmethic operators, and execute the onClick aritimethic operators method
    * @param {String} operator the operator used to change the numbers or to perform a calculation 
    */
function operator(operator) {
    let textField = document.querySelector(`input[type="number"]#txtResult`);

    switch (operator) {
        case ".":
        case ",":
            firstDecimal= true
            break;
        case ">":
        case "Backspace":
            textField.value = backspace(textField.value)
            break;
        case "del":
        case "Delete":
            textField.value = ""
            break;
        case "Enter":
        case "=":
            aritmeticOperator(operator);
            break;
        default:
            console.log("Inválid Operator: "+operator)
            break;
    }
}

/**
 * @Do: Execute the aritmethic operators and put the value into the textField
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
            let value2 = Number(textField.value)
        switch (lastOperator) {            
            case "-":
                value2 = subtraction(value,value2)
                break;
            case "*":
                value2 = multiply(value,value2)
                break;
            case "/":
                value2 = divide(value,value2)
                break;
            case "+":
                value2 = addition(value,value2)
                break;
            case "=":
                aritmeticOperator(lastOperator)
                break;
            default:
                break;
        }
        textField.value = value2
        value = Number()
    }
}

/**
 * @Do: Removes the last number of a string
 * @param {String} txt the string to be removed 
 * @returns the string without the last number
 */
function backspace(txt) {
    return txt = txt.substring(0,txt.length-1)
}

/**
 * @Do: Subtracts the n2 from the n1
 * @param {Number} n1 the number to be subtracted
 * @param {Number} n2 the number that's gonna subtract
 * @returns the number subtracted
 */
function subtraction(n1,n2) {
    return n1 - n2
}

/**
 * @Do: Adds the n2 to the n1
 * @param {Number} n1 the number to be added
 * @param {Number} n2 the number that's gonna add
 * @returns the result of the operation
 */
function addition(n1,n2) {
    return Number(n1) + n2
}

/**
 * @Do: Divide n1 in n2 parts
 * @param {Number} n1 the number to be divided
 * @param {Number} n2 the number that's gonna divide
 * @returns the result of the operation
 */
function divide(n1,n2) {
    return n1 / n2
}

/**
 * @Do: Multiplies the n2 to the n1
 * @param {Number} n1 the number to be multiplied
 * @param {Number} n2 the number that's gonna multiply
 * @returns the result of the operation
 */
function multiply(n1,n2) {
    return n1 * n2
}

var listener = addKeyListener()
listener.subscribe(onClick);

/*@Do Called when the system start, create the components*/
function start() {
    createComponents(normalCalculator);
}