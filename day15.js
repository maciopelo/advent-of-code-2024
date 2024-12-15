const { readFile } = require("./utils");

const data = readFile("data.txt", "\n\n");

const map = data[0].split("\n").map((row) => row.split(""));
const moves = data[1].split("").filter((move) => move !== "\n");
const robotRow = map.findIndex((row) => row.includes("@"));
const robotCol = map[robotRow].findIndex((col) => col === "@");

const first = () => {
  const updateMap = (move, object, map) => {
    const potentialMoves = {
      "^": [-1, 0],
      ">": [0, 1],
      v: [1, 0],
      "<": [0, -1],
    };

    const moveObjectOnMap = (object, dr, dc) => {
      const objectValue = map[object.row][object.col];
      map[object.row][object.col] = ".";
      object.row += dr;
      object.col += dc;
      map[object.row][object.col] = objectValue;
    };

    const [dr, dc] = potentialMoves[move];

    if (map[object.row + dr][object.col + dc] === ".") {
      moveObjectOnMap(object, dr, dc);
      return true;
    }

    if (map[object.row + dr][object.col + dc] === "O") {
      const box = { row: object.row + dr, col: object.col + dc };
      const updated = updateMap(move, box, map);

      if (updated) {
        moveObjectOnMap(object, dr, dc);
        return true;
      }
    }

    return false;
  };

  const mapCopy = [...map];

  const robot = { row: robotRow, col: robotCol };

  for (const move of moves) {
    updateMap(move, robot, mapCopy);
  }

  let gpsCordsSum = 0;
  for (let row = 0; row < mapCopy.length; row++) {
    for (let col = 0; col < mapCopy[row].length; col++) {
      if (mapCopy[row][col] === "O") {
        gpsCordsSum += 100 * row + col;
      }
    }
  }

  console.log(gpsCordsSum);
};
first();
