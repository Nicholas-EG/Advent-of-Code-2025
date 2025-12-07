const fs = require('fs');

function partOne() {
    const hw = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => x.trim().split(/\s+/g));

    let sum = 0;
    for (let i = 0; i < hw[0].length; i++) {
        let term = (hw[hw.length - 1][i] === '+' ? 0 : 1);
        for (let j = 0; j < hw.length - 1; j++) {
            let string = `${term} ${hw[hw.length - 1][i]} ${hw[j][i]}`
            term = eval(string);
        }
        sum += term;
    }
    console.log(sum)
}

function partTwo() {

    function parser(array) {
        let result = new Array(array.length).fill(0).map(x => []);
        let operators = array[array.length - 1];
        operators = operators.replaceAll('+', '*');
        let pointer = 0;
        while (pointer < operators.length) {
            let termSize = operators.indexOf('*', pointer + 1) - pointer - 1;
            for (let i = 0; i < array.length; i++) {
                if (termSize < 0) result[i].push(array[i].slice(pointer));
                else result[i].push(array[i].slice(pointer, pointer + termSize));
            }
            pointer = termSize < 0 ? operators.length : pointer + termSize + 1;
        }
        return result;
    }

    function rewriteNumbers(...input) {
        const result = [];
        for (let i = 0; i < input[0].length; i++) {
            let term = '';
            for (let j = 0; j < input.length; j++) {
                term += input[j][i]
            }
            result.push(+term.trim());
        }
        return result;
    }

    function operate(operator, ...inputs) {
        let term = (operator === '+' ? 0 : 1);
        for (let i = 0; i < inputs.length; i++) {
            let string = `${term} ${operator} ${inputs[i]}`
            term = eval(string);
        }
        return term;
    }

    const hw = parser(fs.readFileSync('./input.txt', 'utf-8').split('\n'));
    let sum = 0;
    for (let i = 0; i < hw[0].length; i++) {
        let terms = [];
        for (let j = 0; j < hw.length - 1; j++) {
            terms.push(hw[j][i])
        }
        sum += operate(hw[hw.length - 1][i][0], ...rewriteNumbers(...terms));
    }
    console.log(sum)
}

partOne();
partTwo();