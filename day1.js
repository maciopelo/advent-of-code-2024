const { readFile } = require("./utils");

const data = readFile("data.txt", "\n");

/* First */
const first = () => {
  const [left, right] = data.reduce(
    (acc, row) => {
      const [left, right] = row.replace(/\s+/g, " ").split(" ");
      acc[0].push(+left);
      acc[1].push(+right);
      return acc;
    },
    [[], []]
  );

  left.sort();
  right.sort();

  let result = 0;
  for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
  }
  console.log(result);
};
first();

/* Second */
const second = () => {
  const [left, countMap] = data.reduce(
    (acc, row) => {
      const [left, right] = row.replace(/\s+/g, " ").split(" ");
      acc[0].push(+left);
      acc[1][right] = acc[1][right] ? acc[1][right] + 1 : 1;
      return acc;
    },
    [[], {}]
  );

  let result = 0;

  left.forEach((element) => {
    result += (countMap[element] || 0) * element;
  });
  console.log(result);
};
second();
