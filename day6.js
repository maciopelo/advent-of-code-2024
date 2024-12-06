const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));

const clockwise = ["top", "right", "bottom", "left"];

const directions = {
  top: [-1, 0],
  bottom: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const checkIfLeftMap = (guard, size) => {
  // squre map
  if (
    guard.y + directions[guard.dir][0] > size ||
    guard.y + directions[guard.dir][0] < 0 ||
    guard.x + directions[guard.dir][1] > size ||
    guard.x + directions[guard.dir][1] < 0
  ) {
    return true;
  }
  return false;
};

const checkIfObstacle = (guard, map) => {
  if (
    map[guard.y + directions[guard.dir][0]][
      guard.x + directions[guard.dir][1]
    ] === "#"
  ) {
    return true;
  }
  return false;
};

const checkIfLooped = (guard, uniquePositions) => {
  if (uniquePositions.has(`${guard.x},${guard.y},${guard.dir}`)) {
    return true;
  }
  return false;
};

const first = (givenMap) => {
  const startRow = givenMap.findIndex((r) => r.includes("^"));

  const guard = {
    x: givenMap[startRow].indexOf("^"),
    y: startRow,
    dir: "top",
  };

  const visitedCords = new Set();

  while (true) {
    visitedCords.add(`${guard.x},${guard.y}`);

    if (checkIfLeftMap(guard, givenMap.length - 1)) break;

    if (checkIfObstacle(guard, givenMap)) {
      const nextDirIdx = clockwise.indexOf(guard.dir) + 1;
      guard.dir = clockwise[nextDirIdx > 3 ? 0 : nextDirIdx];
    } else {
      guard.x += directions[guard.dir][1];
      guard.y += directions[guard.dir][0];
    }
  }
  console.log(visitedCords.size);
};

const second = (givenMap) => {
  const startRow = givenMap.findIndex((r) => r.includes("^"));
  const guard = {
    x: givenMap[startRow].indexOf("^"),
    y: startRow,
    dir: "top",
  };

  const uniquePositions = new Set();

  while (true) {
    if (checkIfLeftMap(guard, givenMap.length - 1)) {
      return 0;
    }

    if (checkIfObstacle(guard, givenMap)) {
      const nextDirIdx = clockwise.indexOf(guard.dir) + 1;
      guard.dir = clockwise[nextDirIdx > 3 ? 0 : nextDirIdx];
    } else {
      uniquePositions.add(`${guard.x},${guard.y},${guard.dir}`);
      guard.x += directions[guard.dir][1];
      guard.y += directions[guard.dir][0];
    }

    if (checkIfLooped(guard, uniquePositions)) {
      return 1;
    }
  }
};

// brute force solution
// const mapCopy = [...data];
// let count = 0;

// for (let i = 0; i < mapCopy.length; i++) {
//   for (let j = 0; j < mapCopy[i].length; j++) {
//     if (mapCopy[i][j] === ".") {
//       mapCopy[i][j] = "#";
//       count += second(data);
//       mapCopy[i][j] = ".";
//     }
//   }
// }

// console.log(count);
