const { readFile } = require("./utils");

const stones = readFile("data.txt").split(" ");

const first = () => {
  const applyRules = (stones) => {
    const updatedStones = [];
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] === "0") {
        updatedStones.push("1");
      } else if (stones[i].length % 2 === 0) {
        const left = stones[i].substring(0, stones[i].length / 2);
        const right = `${+stones[i].substring(stones[i].length / 2)}`;
        updatedStones.push(left);
        updatedStones.push(right);
      } else {
        updatedStones.push(`${+stones[i] * 2024}`);
      }
    }
    return updatedStones;
  };

  const blinks = 25;
  let updatedStones = [...stones];
  for (let blink = 0; blink < blinks; blink++) {
    updatedStones = applyRules(updatedStones);
  }
  console.log(updatedStones.length);
};

const second = () => {
  const applyRules = (stones, blinks) => {
    let stoneCounts = stones.reduce((acc, stone) => {
      acc[stone] = (acc[stone] || 0) + 1;
      return acc;
    }, {});

    for (let blink = 0; blink < blinks; blink++) {
      const newCounts = {};

      for (const stone in stoneCounts) {
        const count = stoneCounts[stone];
        if (stone === "0") {
          newCounts["1"] = (newCounts["1"] || 0) + count;
        } else if (stone.length % 2 === 0) {
          const left = stone.substring(0, stone.length / 2);
          const right = `${+stone.substring(stone.length / 2)}`;
          newCounts[left] = (newCounts[left] || 0) + count;
          newCounts[right] = (newCounts[right] || 0) + count;
        } else {
          const newStone = `${+stone * 2024}`;
          newCounts[newStone] = (newCounts[newStone] || 0) + count;
        }
      }

      stoneCounts = newCounts;
    }

    return Object.values(stoneCounts).reduce((sum, count) => sum + count, 0);
  };

  const stonesCount = applyRules(stones, 75);
  console.log(stonesCount);
};
