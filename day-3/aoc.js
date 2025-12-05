const fs = require('fs');
const banks = fs.readFileSync('./input.txt', 'utf-8').split('\n');

function partOne() {

    function getMaxElement(array) {
        let max = 0;
        for (const term of array) {
            if (term > max) max = term;
        }
        return max;
    }

    let sum = 0;
    banks.forEach((value) => {
        let term = "";
        let leftBound = 0;
        for (let i = 2; i > 0; i--) {
            let largest = getMaxElement(value.slice(leftBound, value.length - i + 1));
            term += largest;
            leftBound = value.indexOf(largest, leftBound) + 1;
        }
        sum += +term;
    });
    console.log(sum);
}

function partTwo() {

    function getMaxElement(array) {
        let max = 0;
        for (const term of array) {
            if (term > max) max = term;
        }
        return max;
    }

    let sum = 0;
    banks.forEach((value) => {
        let term = "";
        let leftBound = 0;
        for (let i = 12; i > 0; i--) {
            let largest = getMaxElement(value.slice(leftBound, value.length - i + 1));
            term += largest;
            leftBound = value.indexOf(largest, leftBound) + 1;
        }
        sum += +term;
    });
    console.log(sum);
}

partOne();
partTwo();