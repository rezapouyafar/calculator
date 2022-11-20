const calculator = $("#calculator");
const change = $("#change");
const buttons = $("#buttons");

const clear = $("#clear");
const backspace = $("#backspace");

const extant = $("#extant");
const divide = $("#divide");
const multiply = $("#multiply");
const minus = $("#minus");
const plus = $("#plus");
const doWork = $(".do");

const equal = $("#equal");

const previousOperand = $(".previous-operand");
const currentOperand = $(".current-operand");
let previousOperandValue = '';
let currentOperandValue = '';
let typing = false;

buttons.click(function (e) {
    const target = $(e.target);
    const targetId = target.attr("id");
    let currentOperandText = currentOperand.text();
    let previousOperandText = previousOperand.text();

    if (previousOperandText.includes("=")) {
        previousOperand.text('0');
        currentOperand.text('0');
        currentOperandText = "0";
        previousOperandText = "0";
        previousOperandValue = '';
        currentOperandValue = '';
    }

    if (target.hasClass("btn-number")) {
        typing = true;

        let numberValue = target.data("input");

        if (currentOperandText.length === 1 && numberValue === ".") {
            currentOperand.text("0.");
        } else if (currentOperandText.includes(".") && numberValue === ".") {
            currentOperand.text(currentOperandText);
        } else {
            if (currentOperandText.indexOf("0") == 0 && !currentOperandText.includes(".")) {
                currentOperandText = '';
            }
            currentOperand.text(currentOperandText + numberValue);
        }
        currentOperandValue = currentOperand.text();
    } else if (target.hasClass("do")) {

        if (typing) {
            typing = false;
            previousOperandValue += " " + currentOperandValue + ' ' + target.text();
            previousOperand.text(previousOperandValue);
        }

        if (isNaN(parseInt(previousOperandValue.slice(previousOperandValue.length - 1, previousOperandValue.length))) && previousOperandValue.length >= 1) {
            previousOperandValue = previousOperandValue.substring(0, previousOperandValue.length - 1) + target.text();
            previousOperand.text(previousOperandValue);
        }
        currentOperand.text("0");
    }
    else if (targetId === equal.attr("id")) {

        let calcValue;
        if (!typing) {
            previousOperandValue = previousOperandValue.substring(0, previousOperandValue.length - 1);
            calcValue = previousOperandValue + target.text();
        } else {
            typing = false;
            previousOperandValue = previousOperandValue + " " + currentOperandValue;
            calcValue = previousOperandValue + ' ' + target.text();
        }

        previousOperand.text(calcValue);

        previousOperandValue = previousOperandValue.replaceAll(/÷/g, "/");
        previousOperandValue = previousOperandValue.replace(/×/g, "*");
        currentOperand.text(eval(previousOperandValue));

    } else if (targetId === clear.attr("id")) {
        currentOperand.text("0");
    } else if (targetId === backspace.attr("id")) {
        if (currentOperandText.length <= 1) {
            currentOperand.text('0');
        } else {
            currentOperand.text(currentOperandText.substring(0, currentOperandText.length - 1));
        }
    }

});


// change background in calculator
let localStorageItem = localStorage.getItem("isActive");
if (localStorageItem && localStorageItem == 'true') {
    changeCalc(change);
}

change.click(function () {
    changeCalc(this);
});

function changeCalc(element) {
    calculator.toggleClass("active");
    $('i', element).toggleClass("fa-sun");
    $('i', element).toggleClass("fa-moon");
    localStorage.setItem("isActive", calculator.hasClass('active'));
}




