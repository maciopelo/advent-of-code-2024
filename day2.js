const { readFile } = require("./utils");

const data = readFile("data.txt", "\n");
console.log(data);
/* First */
const first = () => {
  const safeReports = data.reduce((acc, row) => {
    const levels = row.split(" ");

    for (let i = 1; i < levels.length; i++) {
      const currDiff = levels[i] - levels[i - 1];
      const nextdiff = levels[i + 1] - levels[i];

      // skip last
      const isSameOrder =
        i < levels.length - 1 ? currDiff * nextdiff > 0 : true;

      if (![1, 2, 3].includes(Math.abs(currDiff)) || !isSameOrder) {
        return acc;
      }
    }

    return ++acc;
  }, 0);

  console.log(safeReports);
};

/* Second */
// naive solution
const second = () => {
  const isSafe = (levels) => {
    for (let i = 1; i < levels.length; i++) {
      const currDiff = levels[i] - levels[i - 1];
      const nextDiff = i < levels.length - 1 ? levels[i + 1] - levels[i] : 0;

      const isSameOrder = currDiff * nextDiff >= 0;
      const isValidDiff = [1, 2, 3].includes(Math.abs(currDiff));

      if (!isValidDiff || (i < levels.length - 1 && !isSameOrder)) {
        return false; // Row is unsafe
      }
    }
    return true;
  };

  const safeReports = data.reduce((acc, row) => {
    const levels = row.split(" ").map(Number);

    if (isSafe(levels)) {
      return acc + 1;
    }

    // Try removing each level and check if it becomes safe
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(newLevels)) {
        return acc + 1;
      }
    }

    return acc;
  }, 0);

  console.log(safeReports);
};
