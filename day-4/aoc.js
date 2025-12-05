const fs = require('fs');
const grid = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(''));

function partOne() {

    function isValidRoll(col, row) {
        if (grid[col][row] !== '@') return false;
        let rolls = 0;
        for (let i = (col - 1 >= 0 ? col - 1 : 0); i <= (col + 1 < grid.length - 1 ? col + 1 : grid.length - 1); i++) {
            for (let j = (row - 1 >= 0 ? row - 1 : 0); j <= (row + 1 < grid[0].length - 1 ? row + 1 : grid[0].length - 1); j++) {
                if (grid[i][j] === '@') rolls++;
            }
        }
        rolls--;
        return (rolls < 4 ? true : false);
    }

    let sum = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (isValidRoll(i, j)) sum++;
        }
    }
    return sum;
}

function partTwo() {

    function isValidRoll(col, row) {
        if (grid[col][row] !== '@') return false;
        let rolls = 0;
        for (let i = (col - 1 >= 0 ? col - 1 : 0); i <= (col + 1 < grid.length - 1 ? col + 1 : grid.length - 1); i++) {
            for (let j = (row - 1 >= 0 ? row - 1 : 0); j <= (row + 1 < grid[0].length - 1 ? row + 1 : grid[0].length - 1); j++) {
                if (grid[i][j] === '@') rolls++;
            }
        }
        rolls--;
        return (rolls < 4 ? true : false);
    }

    function remove() {
        const toRemove = new Array(grid.length).fill(0).map(x => new Array(grid[0].length).fill(false));
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (isValidRoll(i, j)) toRemove[i][j] = true;
            }
        }
        let removed = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (toRemove[i][j]) {
                    grid[i][j] = '.';
                    removed++;
                }
            }
        }
        return removed;
    }

    let sum = 0;
    let delta = remove();
    while (delta !== 0) {
        sum += delta;
        delta = remove();
    }
    return sum;
}

console.log(partTwo());