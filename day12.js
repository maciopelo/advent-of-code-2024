const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));

const checkArea = (r, c, areas, currArea) => {
  const plant = data[r][c];
  const plantCords = `${r},${c}`;

  const exists = areas.find((a) => a?.has(plantCords));

  if (exists) {
    return;
  }

  let area = currArea || new Set();

  if (!currArea) {
    areas.push(area);
  }

  area.add(plantCords);

  if (r - 1 >= 0 && data[r - 1][c] === plant) {
    checkArea(r - 1, c, areas, area);
  }
  if (r + 1 < data.length && data[r + 1][c] === plant) {
    checkArea(r + 1, c, areas, area);
  }
  if (c - 1 >= 0 && data[r][c - 1] === plant) {
    checkArea(r, c - 1, areas, area);
  }
  if (c + 1 < data[r].length && data[r][c + 1] === plant) {
    checkArea(r, c + 1, areas, area);
  }

  return;
};

const first = () => {
  const countFences = (area) =>
    area.reduce((acc, plant) => {
      const [r, c] = plant;
      let fence = 4;
      const neighbours = area.filter((a) => {
        const [nr, nc] = a;
        return (
          (nr === r && (nc === c - 1 || nc === c + 1)) ||
          (nc === c && (nr === r - 1 || nr === r + 1))
        );
      }).length;

      return acc + (fence - neighbours);
    }, 0);

  const areas = [];

  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      checkArea(r, c, areas);
    }
  }

  const mappedAreas = areas.map((area) =>
    Array.from(area).map((plant) => plant.split(",").map(Number))
  );

  const totalPrice = mappedAreas.reduce((acc, area) => {
    const areaCount = area.length;

    const fences = countFences(area);

    return acc + areaCount * fences;
  }, 0);

  console.log(totalPrice);
};
first();

const second = () => {
  const countSides = (area) => {
    const mappedArea = [...area].map((plant) => plant.split(",").map(Number));

    const up = new Set();
    const down = new Set();
    const left = new Set();
    const right = new Set();

    for (const [r, c] of mappedArea) {
      if (!area.has(`${r - 1},${c}`)) {
        up.add(`${r},${c}`);
      }
      if (!area.has(`${r + 1},${c}`)) {
        down.add(`${r},${c}`);
      }
      if (!area.has(`${r},${c - 1}`)) {
        left.add(`${r},${c}`);
      }
      if (!area.has(`${r},${c + 1}`)) {
        right.add(`${r},${c}`);
      }
    }

    let count = 0;

    for (const borderPlant of up) {
      const [r, c] = borderPlant.split(",").map(Number);

      if (left.has(`${r},${c}`)) {
        count++;
      }
      if (right.has(`${r},${c}`)) {
        count++;
      }
      if (right.has(`${r - 1},${c - 1}`) && !left.has(borderPlant)) {
        count++;
      }
      if (left.has(`${r - 1},${c + 1}`) && !right.has(borderPlant)) {
        count++;
      }
    }

    for (const borderPlant of down) {
      const [r, c] = borderPlant.split(",").map(Number);
      if (left.has(`${r},${c}`)) {
        count++;
      }
      if (right.has(`${r},${c}`)) {
        count++;
      }
      if (right.has(`${r + 1},${c - 1}`) && !left.has(borderPlant)) {
        count++;
      }
      if (left.has(`${r + 1},${c + 1}`) && !right.has(borderPlant)) {
        count++;
      }
    }

    return count;
  };

  const areas = [];

  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      checkArea(r, c, areas);
    }
  }

  const totalPrice = areas.reduce((acc, area) => {
    const areaCount = area.size;
    const sides = countSides(area);

    return acc + areaCount * sides;
  }, 0);

  console.log(totalPrice);
};
second();
