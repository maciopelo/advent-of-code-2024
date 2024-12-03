const { readFile } = require("./utils");

const data = readFile("data.txt", "\n");

/* First */
const first = () => {
  const re = /mul\(\d{1,3},\d{1,3}\)/g;

  const sum = data.reduce((acc, curr) => {
    const arr = [...curr.matchAll(re)];

    for (let i = 0; i < arr.length; i++) {
      const [factor1, factor2] = arr[i][0].match(/\d+/g).map(Number);
      acc += factor1 * factor2;
    }

    return acc;
  }, 0);
  console.log(sum);
};

/* Second */
const second = () => {
  const doRe = /do\(\)/;
  const dontRe = /don't\(\)/;
  const re = /(?:mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;

  const sum = data.reduce(
    (acc, curr) => {
      const arr = [...curr.matchAll(re)];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0].match(doRe)) {
          acc.flag = true;
        } else if (arr[i][0].match(dontRe)) {
          acc.flag = false;
        } else if (acc.flag) {
          const [factor1, factor2] = arr[i][0].match(/\d+/g).map(Number);
          acc.sum += factor1 * factor2;
        }
      }

      return acc;
    },
    { sum: 0, flag: true }
  );
  console.log(sum);
};
