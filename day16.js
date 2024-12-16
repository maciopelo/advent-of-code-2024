const { readFile } = require("./utils");

const data = readFile("data.txt", "\n");
const maze = data.map((row) => row.split(""));
const size = maze.length;

const first = () => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let start, end;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (maze[i][j] === "S") start = [i, j];
      if (maze[i][j] === "E") end = [i, j];
    }
  }

  const pq = [];
  const costs = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Array(4).fill(Infinity))
  );

  for (let direction = 0; direction < 4; direction++) {
    pq.push([start[0], start[1], direction, 0]);
    costs[start[0]][start[1]][direction] = 0;
  }

  while (pq.length > 0) {
    pq.sort((a, b) => a[3] - b[3]);
    const [currentRow, currentCol, currentDir, currentCost] = pq.shift();

    if (currentRow === end[0] && currentCol === end[1]) {
      console.log(currentCost);
    }

    for (let d = 0; d < 4; d++) {
      const [dx, dy] = directions[d];
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;

      if (
        newRow < 0 ||
        newRow >= size ||
        newCol < 0 ||
        newCol >= size ||
        maze[newRow][newCol] === "#"
      ) {
        continue;
      }

      const stepCost = 1;
      const rotationCost = currentDir === d ? 0 : 1000;
      const newCost = currentCost + stepCost + rotationCost;

      if (newCost < costs[newRow][newCol][d]) {
        costs[newRow][newCol][d] = newCost;
        pq.push([newRow, newCol, d, newCost]);
      }
    }
  }
};
first();
