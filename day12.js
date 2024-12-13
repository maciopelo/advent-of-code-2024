const { readFile } = require("./utils");

const data = readFile("data.txt", "\n").map((l) => l.split(""));

const first = () => {
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

    const fences = area.reduce((acc, plant) => {
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

    return acc + areaCount * fences;
  }, 0);

  console.log(totalPrice);
};
