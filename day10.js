const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));

const first = () => {
  const checkScore = (r, c, visited) => {
    let count = +data[r][c];

    if (count === 9) {
      visited.add(`${r},${c}`);
      return;
    }

    if (r - 1 >= 0 && +data[r - 1][c] === count + 1) {
      checkScore(r - 1, c, visited);
    }
    if (r + 1 < data.length && +data[r + 1][c] === count + 1) {
      checkScore(r + 1, c, visited);
    }
    if (c - 1 >= 0 && +data[r][c - 1] === count + 1) {
      checkScore(r, c - 1, visited);
    }
    if (c + 1 < data[r].length && +data[r][c + 1] === count + 1) {
      checkScore(r, c + 1, visited);
    }

    return;
  };

  let finalScore = 0;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      if (data[r][c] === "0") {
        const visited = new Set();
        checkScore(r, c, visited);
        finalScore += visited.size;
      }
    }
  }
  console.log(finalScore);
};

const second = () => {
  const checkScore = (r, c) => {
    let count = +data[r][c];

    if (count === 9) {
      return 1;
    }

    let score = 0;

    if (r - 1 >= 0 && +data[r - 1][c] === count + 1) {
      score += checkScore(r - 1, c);
    }
    if (r + 1 < data.length && +data[r + 1][c] === count + 1) {
      score += checkScore(r + 1, c);
    }
    if (c - 1 >= 0 && +data[r][c - 1] === count + 1) {
      score += checkScore(r, c - 1);
    }
    if (c + 1 < data[r].length && +data[r][c + 1] === count + 1) {
      score += checkScore(r, c + 1);
    }

    return score;
  };

  let finalScore = 0;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      if (data[r][c] === "0") {
        finalScore += checkScore(r, c);
      }
    }
  }
  console.log(finalScore);
};
