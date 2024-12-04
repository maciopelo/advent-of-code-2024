const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));

const first = () => {
  const directions = [
    [-1, 0], // top
    [1, 0], // bottom
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ];

  const checkSurrounding = (x, y) => {
    let count = 0;
    const word = "XMAS";
    for (const [dx, dy] of directions) {
      let found = true;
      for (let k = 0; k < word.length; k++) {
        const nextX = x + k * dx;
        const nextY = y + k * dy;
        if (
          nextX < 0 ||
          nextY < 0 ||
          nextX >= data.length ||
          nextY >= data[nextX].length ||
          data[nextX][nextY] !== word[k]
        ) {
          found = false;
          break;
        }
      }
      if (found) {
        count++;
      }
    }
    return count;
  };

  let sum = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      sum += checkSurrounding(x, y);
    }
  }
  console.log(sum);
};
first();

const second = () => {
  const msAsciiSum = "M".charCodeAt(0) + "S".charCodeAt(0);

  const checkSurrounding = (x, y) => {
    if (data[y][x] !== "A") return 0;

    const leftTop = data[y - 1][x - 1];
    const rightTop = data[y - 1][x + 1];
    const leftBottom = data[y + 1][x - 1];
    const rightBottom = data[y + 1][x + 1];

    if (
      leftTop.charCodeAt(0) + rightBottom.charCodeAt(0) === msAsciiSum &&
      leftBottom.charCodeAt(0) + rightTop.charCodeAt(0) === msAsciiSum
    ) {
      return 1;
    }

    return 0;
  };

  let sum = 0;
  for (let y = 1; y < data.length - 1; y++) {
    for (let x = 1; x < data[y].length - 1; x++) {
      sum += checkSurrounding(x, y);
    }
  }
  console.log(sum);
};
second();
