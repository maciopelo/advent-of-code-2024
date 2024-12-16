const { readFile } = require("./utils");

const data = readFile("data.txt", "\n\n");

const map = data[0].split("\n").map((row) => row.split(""));
const moves = data[1].split("").filter((move) => move !== "\n");
const robotRow = map.findIndex((row) => row.includes("@"));
const robotCol = map[robotRow].findIndex((col) => col === "@");

const potentialMoves = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

const updateMap = (move, object, map, obstacles = ["O"]) => {
  const moveObjectOnMap = (object, dr, dc) => {
    const objectValue = map[object.row][object.col];
    map[object.row][object.col] = ".";
    object.row += dr;
    object.col += dc;
    map[object.row][object.col] = objectValue;
  };

  const [dr, dc] = potentialMoves[move];
  const nextObject = map[object.row + dr][object.col + dc];

  if (nextObject === ".") {
    moveObjectOnMap(object, dr, dc);
    return true;
  }

  if (obstacles.some((o) => o === nextObject)) {
    const box = { row: object.row + dr, col: object.col + dc };
    const updated = updateMap(move, box, map, obstacles);

    if (updated) {
      moveObjectOnMap(object, dr, dc);
      return true;
    }
  }

  return false;
};

const first = () => {
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

const second = () => {
  const buildLargerMap = (map) => {
    const newMap = [...Array(map.length).keys()].map((_) =>
      [...Array(map.length * 2).keys()].map((_) => ".")
    );

    newMap[robotRow][robotCol * 2] = "@";

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === "#") {
          newMap[row][col * 2] = "#";
          newMap[row][col * 2 + 1] = "#";
        }
        if (map[row][col] === "O") {
          newMap[row][col * 2] = "[";
          newMap[row][col * 2 + 1] = "]";
        }
      }
    }

    return newMap;
  };

  const moveLeftRight = updateMap;

  const checkIfBoxesMovable = (object, map, dr, dc, movable, boxes) => {
    const box = { row: object.row, col: [object.col] };

    if (map[object.row][object.col] === "[") {
      box.col.push(object.col + dc + 1);
    } else {
      box.col.unshift(object.col + dc - 1);
    }

    console.log(object, map[object.row][object.col], boxes);
    if (
      map[object.row][object.col] === "[" ||
      map[object.row][object.col] === "]"
    ) {
      boxes.add(JSON.stringify(box));
    }

    const nextLeft = map[box.row + dr][box.col[0] + dc];
    const nextRight = map[box.row + dr][box.col[1] + dc];

    if (nextLeft === "." && nextRight === ".") {
      return movable && true;
    }

    if (nextLeft === "#" || nextRight === "#") {
      return movable && false;
    }

    const resultLeft = checkIfBoxesMovable(
      { row: box.row + dr, col: box.col[0] + dc },
      map,
      dr,
      dc,
      movable,
      boxes
    );

    const resultRight = checkIfBoxesMovable(
      { row: box.row + dr, col: box.col[1] + dc },
      map,
      dr,
      dc,
      movable,
      boxes
    );

    return resultLeft && resultRight;
  };

  const moveRobot = (robot, dr, dc, map) => {
    const objectValue = map[robot.row][robot.col];
    map[robot.row][robot.col] = ".";
    robot.row += dr;
    robot.col += dc;
    map[robot.row][robot.col] = objectValue;
  };

  const moveTopBottom = (move, object, map) => {
    const [dr, dc] = potentialMoves[move];
    const nextObjectValue = map[object.row + dr][object.col + dc];

    if (nextObjectValue === ".") {
      moveRobot(object, dr, dc, map);
    }

    if (nextObjectValue === "[" || nextObjectValue === "]") {
      const nextObject = {
        row: object.row + dr,
        col: object.col + dc,
      };

      const boxes = new Set();

      const movable = checkIfBoxesMovable(nextObject, map, dr, dc, true, boxes);

      if (movable) {
        const sortedBoxes = Array.from(boxes)

          .map(JSON.parse)
          .sort((a, b) => (move === "^" ? a.row - b.row : b.row - a.row));

        // console.log("🚀 ~ moveTopBottom ~ sortedBoxes:", sortedBoxes);
        for (const box of sortedBoxes) {
          map[box.row][box.col[0]] = ".";
          map[box.row][box.col[1]] = ".";
          map[box.row + dr][box.col[0] + dc] = "[";
          map[box.row + dr][box.col[1] + dc] = "]";
        }
        moveRobot(object, dr, dc, map);
      }
    }
  };

  const largerMap = buildLargerMap(map);

  const robot = { row: robotRow, col: robotCol * 2 };

  const countBoxes = () => {
    let count = 0;
    for (let row = 0; row < largerMap.length; row++) {
      for (let col = 0; col < largerMap[row].length; col++) {
        if (largerMap[row][col] === "[") {
          count++;
        }
      }
    }
    return count;
  };
  largerMap[2][7] = ".";
  largerMap[2][5] = "[";
  largerMap[2][6] = "]";
  console.table(largerMap);

  let i = 1;
  for (const move of moves) {
    const count = countBoxes();
    // if (i > 504 && i < 507) {
    //   console.log(i, count, move);
    //   console.table(largerMap);
    // }
    // if (count > 21) {
    //   console.log(i);
    //   console.table(largerMap);
    //   return;
    // }
    if (move === "<" || move === ">") {
      moveLeftRight(move, robot, largerMap, ["[", "]"]);
    } else {
      moveTopBottom(move, robot, largerMap);
    }
    i++;
  }
  console.table(largerMap);
  // console.log(countBoxes());

  // let gpsCordsSum = 0;
  // for (let row = 0; row < mapCopy.length; row++) {
  //   for (let col = 0; col < mapCopy[row].length; col++) {
  //     if (mapCopy[row][col] === "O") {
  //       gpsCordsSum += 100 * row + col;
  //     }
  //   }
  // }

  // console.log(gpsCordsSum);

  // 505
};
second();
