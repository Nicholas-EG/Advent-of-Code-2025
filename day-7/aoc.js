const fs = require('fs');
let grid = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(''));

function partOne() {
    function findStart() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 'S') return [i, j];
            }
        }
    }

    function lineDown(row, col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;
        if (grid[row][col] === '|') return;
        else if (grid[row][col] === '^') {
            lineDown(row, col + 1);
            lineDown(row, col - 1);
            return sum++;
        }
        grid[row][col] = '|';
        return lineDown(row + 1, col);
    }

    let sum = 1;
    console.log(lineDown(...findStart()))

}

function partTwo() {
    function findStart() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 'S') return [i, j];
            }
        }
    }

    function getValue(row, col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return 0;
        if (grid[row][col] === '.' || grid[row][col] === '^') return 0;
        return +grid[row][col];
    }

    let [x, y] = findStart();
    grid[x][y] = 1;
    for (let i = 1; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '^') {
                grid[i][j - 1] = getValue(i, j - 1) + getValue(i - 1, j);
                grid[i][j + 1] = getValue(i, j + 1) + getValue(i - 1, j + 1) + getValue(i - 1, j);
                j++;
            } else {
                grid[i][j] = getValue(i - 1, j);
            }
        }
    }

    console.log(grid[grid.length - 1].reduce((sum, curr) => sum + curr))
}

// partOne();
partTwo();