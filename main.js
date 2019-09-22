const display = document.querySelector('.display'),
      buttons = Array.from(document.getElementsByClassName('btn')),
      restartBtn = document.querySelector('.restart-btn');
let   buffer  = [],
      operand = [];

display.innerText = "0";

function execute(btn) {
    switch (btn.innerText) {
        case "+":
            putOperand(btn);
            break;
        case "-":
            putOperand(btn);
            break;
        case "=":
            calculate();
            break;
        default:
            concatenate(btn);
    }
};

function concatenate(btn) {
    if (display.innerText === '0') {
        display.innerText = btn.innerText;
    } else {
        display.innerText = display.innerText.concat(btn.innerText);
    }
};

function putOperand(btn) {
    if (btn.innerText === '+') {
        operand.push('+');
    } else if (btn.innerText === '-') {
        operand.push('-');
    };
    buffer.push(display.innerText);
    display.innerText = '0';
};

function calculate() {
    // Change buffer values from string to number
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = parseInt(buffer[i]);
    };
    let result = buffer[0];
    // Go through calculations. Operand array is one step behind because the last calculated value is outside of buffer array - its in display.innerText
    for (let i = 1; i < buffer.length; i++) {
        if (operand[i-1] === "+") {
            result = result + buffer[i];
        } else if (operand[i-1] === "-") {
            result = result - buffer[i];
        };
    };
    // Calculate last value
    if (operand[operand.length-1] === "+") {
        result = result + parseInt(display.innerText);
    } else if (operand[operand.length-1] === "-") {
        result = result - parseInt(display.innerText);
    };
    display.innerText = result;
    // drop values from arrays
    buffer = [];
    operand = [];
}

function restart() {
    buffer = [];
    operand = [];
    display.innerText = '0';
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => execute(btn));
});

restartBtn.addEventListener('click', restart);