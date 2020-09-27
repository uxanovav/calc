const numbers = document.querySelectorAll('.button-number');
const operations = document.querySelectorAll('.button-option');
const eq = document.getElementById('equ');
const ac = document.getElementById('ac');
const c = document.getElementById('c');
const screen = document.querySelector('.screen-value');
const resultScreen = document.getElementById('result');
const sqrt = document.getElementById('sqrt');
const plmin = document.getElementById('plmin');
let lastAction = '';
let result = '';
let current = '';
let a = '';
let b = '';
let action = '';

for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    num.addEventListener('click', function (e) {
        numberPress(num.id);
        resultScreen.innerHTML = result;
    })
}

for (let i = 0; i < operations.length; i++) {
    let ops = operations[i];
    ops.addEventListener('click', function (e) {
        optionPress(ops.id);
        result += " " + ops.innerHTML + " ";
        resultScreen.innerHTML = result;
    })
}

ac.addEventListener('click', function (e) {
    clearAll();
});

c.addEventListener('click', function (e) {
    result = resultScreen.innerHTML.substring(0, resultScreen.innerHTML.length - current.length) + " ";
    current = '';
    screen.value = current;
    resultScreen.innerHTML = result;
});

eq.addEventListener('click', function (e) {
    a = onEqPress(a, current, action);
    result += ' = ' + a + ' ';
    resultScreen.innerHTML = result;
});

screen.addEventListener('oninput', function (e) {
    resultScreen.innerHTML = screen.value;
})

sqrt.addEventListener('click', function (e) {
    current = screen.value;
    a = current;
    action = sqrt.id;
    if (Number(a) > 0) {
        onEqPress(a, a, action);
        result += ' = ' + screen.value + ' ';
        result = sqrt.innerText + result;
        resultScreen.innerHTML = result;
        result = Math.sqrt(Number(a)).toString();
    } else {
        resultScreen.innerHTML = 'Value lower than zero!!!'
        setTimeout(clearAll, 1000);
    }
})

plmin.addEventListener('click', function (e) {
    console.log(current);
    if (current != '' && current != 0 && !current.includes('-')) {
        current = '-' + current;
    } else {
        current = current.slice(1);
    }
    screen.value = current;
    result = screen.value
    resultScreen.innerHTML = result;
})

function numberPress(id) {
    switch (id) {
        case 'one':
            current += '1';
            result += '1';
            break;
        case 'two':
            current += '2';
            result += '2';
            break;
        case 'three':
            current += '3';
            result += '3';
            break;
        case 'four':
            current += '4';
            result += '4';
            break;
        case 'five':
            current += '5';
            result += '5';
            break;
        case 'six':
            current += '6';
            result += '6';
            break;
        case 'seven':
            current += '7';
            result += '7';
            break;
        case 'eigth':
            current += '8';
            result += '8';
            break;
        case 'nine':
            current += '9';
            result += '9';
            break;
        case 'zzero':
            current += '0';
            result += '0';
            break;
        case 'dott':
            if (current.includes('.') || current.length === 0) {
                break;
            } else {
                current += '.';
                result += '.';
                break;
            }
    }
    screen.value = current;
}

function optionPress(id) {
    if (current !== ''){
        if (current !== a) {
            b = current;
        } else {
            b = a;
        }
        if (lastAction!='eq'){
            onEqPress(a,b,action);
        }
        action = id;
        a = screen.value;
        current = '';
        lastAction = id;
    }
}

function onEqPress(a, total, action) {
    b = total;
    if (action === 'plus') {
        if (!Number.isInteger(Number(a)) || !Number.isInteger(Number(b))) {
            total = (Number(a) * 100 + Number(b) * 100) / 100;
            let max = a.length >= b.length ? a : b;
            if (total.toString().length > max.length + 1) {
                total = +total.toFixed(max.length);
            }

        } else {
            total = Number(a) + Number(b);
        }
        a = total.toString();
        screen.value = total.toString();
    }
    if (action === 'minus') {
        total = Number(a) - Number(b);
        a = total.toString();
        screen.value = total.toString();
    }
    if (action === 'multiply') {
        total = Number(a) * Number(b);
        a = total.toString();
        screen.value = total.toString();
    }
    if (action === 'divide') {
        total = Number(a) / Number(b);
        a = total.toString();
        screen.value = total.toString();
    }
    if (action === 'sqrt') {
        total = Math.sqrt(a);
        a = total.toString();
        screen.value = total.toString();
        current = a;
    }
    if (action === 'expo') {
        total = Math.pow(a, b);
        a = total.toString();
        screen.value = total.toString();
    }

    lastAction = 'eq';
    return a;
}

const clearAll = () => {
    current = '';
    screen.value = current;
    a = '';
    b = '';
    action = '';
    result = '';
    resultScreen.innerHTML = result;
}