let displayValue = document.getElementById("display-value");
let displayHistory = document.getElementById("display-history");
const dotBtn = document.getElementById('dot');
const negativeBtn = document.getElementById("negative");
const clearBtn = document.getElementById('clear');
const backSpace = document.getElementById("backspace");
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const num4 = document.getElementById('num4');
const num5 = document.getElementById('num5');
const num6 = document.getElementById('num6');
const num7 = document.getElementById('num7');
const num8 = document.getElementById('num8');
const num9 = document.getElementById('num9');
const num0 = document.getElementById('num0'); 

// Global variables
var fullNumber = '';
var addS = "+";
var substractS = "-";
var multiplyS = "x";
var divideS = "÷";
var fullNumbers = [];
var operationsList = [];
var calculation = "";

// Clear button
function clear() {
    cleanNumbersList();
    cleanOperationsList();
    displayValue.innerText = "0";
    displayHistory.innerText = "0";
    calculation = "";
}

// Extra buttons
clearBtn.onclick = () => clear();
negativeBtn.onclick = () => negative();
dotBtn.onclick = () => displayNumber(dot);
backSpace.onclick = () => callBackSpace();
window.addEventListener("keydown", setInput);

// keboard support
function setInput(e) {
    if (e >= 0 & e <= 9) {
        displayNumber("num" + e);
    }
}


// Operations
function add(num1, num2) {
    calculation = (parseFloat(num1)+parseFloat(num2)).toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    displayValue.innerText = calculation;
    
}

function substract(num1, num2) {
    calculation = (parseFloat(num1)-parseFloat(num2)).toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    displayValue.innerText = calculation;
}

function multiply(num1, num2) {
    calculation = (parseFloat(num1)*parseFloat(num2)).toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    displayValue.innerText = calculation;
}

function divide(num1, num2) {
    calculation = (parseFloat(num1)/parseFloat(num2)).toFixed(2).replace(/(\.[0-9]*[1-9])0+$|\.0*$/,'$1');
    if (calculation === "Infinity") {        
        displayValue.innerText = "Wrong";
        } else {
            displayValue.innerText = calculation;
        }
    
}

function doNothing() {
    displayValue.innerText = fullNumber;
}


// Call the operation
function operate(a) {
    if (fullNumber) {
        if (fullNumbers.length === 0) {
            fullNumbers.push(calculation)
        }
        pickOperator(a);
        showHistory();
        cleanNumbersList();
        cleanOperationsList();
    }
}


// Pick the right operator 
function pickOperator(a) {
    fullNumbers.push(fullNumber);
    if (a === "+") {
        add(fullNumbers[0], fullNumbers[1])
    } else if (a === "-") {
        substract(fullNumbers[0], fullNumbers[1])
    } else if (a === "x") {
        multiply(fullNumbers[0], fullNumbers[1])
    } else if (a === "÷") {
        divide(fullNumbers[0], fullNumbers[1])
    } else {
        doNothing();
    }
}

// Display the number 
function displayNumber(num) {
    if (fullNumber.length <8){
        oneDot();
        removeZero();
        fullNumber += num.innerText;
        displayValue.innerText = fullNumber;
    }
}

// Remove the first 0
function removeZero() {
    if (fullNumber[0] === ".") {
        fullNumber = '';
    }
}

// Just one dot 
function oneDot() {
    if (fullNumber[0] === ".")  {
        fullNumber = '0.';
        displayValue.innerText = fullNumber;
    }  else if ((fullNumber.match(/\./g)||[]).length === 2) {
        fullNumber = fullNumber.slice(0, -1);
        displayValue.innerText = fullNumber;
    }
}

// clear last digit
function callBackSpace() {
    fullNumber = fullNumber.slice(0, -1);
    displayValue.innerText = fullNumber;
}

// Add negative value
function negative() {
    if (fullNumber[0] !== "-") {
        fullNumber = `-${fullNumber}`;
        displayValue.innerText = fullNumber;
    } else {
        fullNumber = fullNumber.substr(1);
        displayValue.innerText = fullNumber;
    }
}

// Add numbers to list and clear the displayed number
function clickOperator(operatorS) {
    if (fullNumber) fullNumbers.push(fullNumber);
    operationsList.push(operatorS);
    fullNumber = "";
}


// Show history of the numbers and operation
function showHistory() {
    displayHistory.innerText = fullNumbers[0] + " " + operationsList[0] + " " + fullNumbers[1] + " = ";
}

// Clean the Arrays
function cleanNumbersList() {
    while(fullNumbers.length > 0) {
        fullNumbers.pop();
    }
    fullNumber = "";
}
function cleanOperationsList(){
    while(operationsList.length > 0) {
        operationsList.pop();
    }
}
