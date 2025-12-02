const fs = require('fs');

function partOne() {
    const command = fs.readFileSync('./input.txt', 'utf-8').split('\n');

    let count = 0;
    let dial = 50;

    command.forEach((value) => {
        // console.log(dial)
        let delta = +value.slice(1);
        if (value[0] === 'R') {
            dial = (dial + delta) % 100;
        } else {
            dial = (dial - delta) % 100;
            if (dial < 0) dial = 100 + dial;
        }
        if (dial === 0) count++;
    });

    console.log(count);
}
// partOne();

function partTwo() {
    const turns = fs.readFileSync('./input.txt', 'utf-8').split('\n');

    let count = 0;
    let dial = 50;

    turns.forEach((value) => {
        // console.log(`${dial}\t${count}\t${(value.length >= 4 ? `\x1b[31m${value}\x1b[0m` : `${value}`)}`);
        let delta = +value.slice(1);
        if (value[0] === 'R') {
            dial += delta;
            if (dial >= 100) {
                count += Math.floor(dial / 100);
                dial = dial % 100;
            }
        } else {
            dial -= delta;
            if (dial < 0) {
                count += Math.abs(Math.floor(dial / 100));
                if ((dial + delta) % 100 === 0) count--;
                dial = dial % 100 === 0 ? 0 : 100 + (dial % 100);
            }
            if (dial === 0) count++;
        }
    });

    console.log(count);
}

partTwo();