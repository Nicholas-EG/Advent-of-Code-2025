const fs = require('fs');

const ranges = fs.readFileSync('./input.txt', 'utf-8');


function partOne() {

    const fruits = ranges.slice(ranges.indexOf('\n\n')).trim().split('\n');
    const spans = ranges.slice(0, ranges.indexOf('\n\n'))
        .split('\n')
        .map(x => [+x.slice(0, x.indexOf('-')), +x.slice(x.indexOf('-') + 1)]);

    let sum = 0;
    outter: for (const fruit of fruits) {
        for (const [low, high] of spans) {
            if (low <= fruit && fruit <= high) {
                sum++;
                continue outter;
            }
        }
    }

    console.log(sum)
}

function partTwo() {

    function createUniqueRanges() {
        const spans = ranges.slice(0, ranges.indexOf('\n\n'))
            .split('\n')
            .map(x => [+x.slice(0, x.indexOf('-')), +x.slice(x.indexOf('-') + 1)])
            .sort((a, b) => a[0] - b[0]);

        let uniqueRanges = [];
        uniqueRanges.push(spans[0]);
        for (let i = 1; i < spans.length; i++) {
            if (uniqueRanges[uniqueRanges.length - 1][1] < spans[i][0]) {
                uniqueRanges.push(spans[i]);
            } else if (uniqueRanges[uniqueRanges.length - 1][1] >= spans[i][0]) {
                uniqueRanges[uniqueRanges.length - 1][1] = 
                    uniqueRanges[uniqueRanges.length - 1][1] > spans[i][1] ? uniqueRanges[uniqueRanges.length - 1][1] : spans[i][1];
            }
        }
        return uniqueRanges;
    }

    const uRanges = createUniqueRanges();
    let sum = 0;
    for (let [low, high] of uRanges) {
        sum += +high - +low + 1;
    }
    console.log(sum);
}

partOne();
partTwo();