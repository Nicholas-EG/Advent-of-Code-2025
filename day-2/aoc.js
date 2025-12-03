const fs = require('fs');

function partOne() {
    function isInvalidID(id) {
        if (typeof id === 'number') id = "" + id;
        if (id.length % 2 !== 0) return false;
        for (let i = 0, j = id.length / 2; j < id.length; i++, j++) {
            if (id[i] !== id[j]) return false;
        }
        return true;
    }

    const ranges = fs.readFileSync('./input.txt', 'utf-8').split(',');
    let sum = 0;
    ranges.forEach((value) => {
        const start = +value.slice(0, value.indexOf('-'));
        const end = +value.slice(value.indexOf('-') + 1);
        for (let i = start; i < end + 1; i++) {
            if (isInvalidID(i)) sum += i;
        }
    });

    console.log(sum)
}

function partTwo() {
    const factors = {
        1: [1],
        2: [1],
        3: [1],
        4: [1, 2],
        5: [1],
        6: [1, 2, 3],
        7: [1],
        8: [1, 2, 4],
        9: [1, 3],
        10: [1, 2, 5],
    }

    function splitString(string, length) {
        let result = [];
        for (let i = 0; i < string.length; i = i + length) {
            result.push(string.slice(i, i + length))
        }
        return result;
    }

    function isInvalidID(id) {
        if (typeof id === 'number') id = "" + id;
        const partitions = factors[id.length];
        outter: for (let i = 0; i < partitions.length; i++) {
            let substrs = splitString(id, partitions[i]);
            if (substrs.length === 1) continue;
            for (let j = 1; j < substrs.length; j++) {
                if (substrs[j] !== substrs[0]) {
                    continue outter;
                }
            }
            return true;
        }
        return false;
    }

    const ranges = fs.readFileSync('./input.txt', 'utf-8').split(',');
    let sum = 0;
    ranges.forEach((value) => {
        const start = +value.slice(0, value.indexOf('-'));
        const end = +value.slice(value.indexOf('-') + 1);
        for (let i = start; i <= end; i++) {
            if (isInvalidID(i)) sum += i;
        }
    });

    console.log(sum);
}

partOne();
partTwo();