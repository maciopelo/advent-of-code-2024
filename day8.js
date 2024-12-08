const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));
const size = data.length; // square
const re = /[A-Za-z0-9]/g;

const checkIfOutOfMap = (row, col) => {
  return row >= size || col >= size || row < 0 || col < 0;
};

const first = () => {
  const addUniqueAntinodes = (row, col, map, antinodes) => {
    for (let r = row; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (map[r][c] === map[row][col] && r !== row && c !== col) {
          const dy = Math.abs(row - r);
          const dx = col - c;

          if (!checkIfOutOfMap(row - dy, col + dx)) {
            antinodes.add(`${row - dy},${col + dx}`);
          }

          if (!checkIfOutOfMap(r + dy, c - dx)) {
            antinodes.add(`${r + dy},${c - dx}`);
          }
        }
      }
    }
  };

  const map = [...data];

  const uniqueAntinodes = new Set();

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (map[r][c].match(re)) {
        addUniqueAntinodes(r, c, map, uniqueAntinodes);
      }
    }
  }

  console.log(uniqueAntinodes.size);
};

const second = () => {
  const addUniqueAntinodes = (row, col, map, antinodes) => {
    for (let r = row; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (map[r][c] === map[row][col]) {
          const halfDiagonal = Math.ceil(size * Math.SQRT2);

          for (let count = 1; count < halfDiagonal; count++) {
            const dy = Math.abs(row - r) * count;
            const dx = (col - c) * count;

            if (!checkIfOutOfMap(row - dy, col + dx)) {
              antinodes.add(`${row - dy},${col + dx}`);
            }

            if (!checkIfOutOfMap(r + dy, c - dx)) {
              antinodes.add(`${r + dy},${c - dx}`);
            }
          }
        }
      }
    }
  };

  const map = [...data];

  const uniqueAntinodes = new Set();

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (map[r][c].match(re)) {
        addUniqueAntinodes(r, c, map, uniqueAntinodes);
      }
    }
  }

  console.log(uniqueAntinodes.size);
};
