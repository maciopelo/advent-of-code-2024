const { readFile } = require("./utils");

const data = readFile("data.txt", "\n");

const generateCombinations = (elements, length) => {
  const combinations = [];
  const n = elements.length;

  const indices = Array(length).fill(0);

  while (true) {
    const currentCombination = indices.map((index) => elements[index]);
    combinations.push(currentCombination);

    let i = length - 1;
    while (i >= 0 && indices[i] === n - 1) {
      indices[i] = 0;
      i--;
    }

    if (i < 0) break;

    indices[i]++;
  }

  return combinations;
};

const first = () => {
  let sum = 0;
  for (const equation of data) {
    const [resultString, rest] = equation.split(":");
    const result = Number(resultString);
    const numbers = rest.trim().split(" ").map(Number);
    const combinations = generateCombinations(["+", "*"], numbers.length - 1);

    for (const combination of combinations) {
      const potentialResult = combination.reduce((acc, operation, idx) => {
        if (operation === "+") {
          return acc + numbers[idx + 1];
        } else {
          return acc * numbers[idx + 1];
        }
      }, +numbers[0]);

      if (potentialResult === result) {
        sum += result;
        break;
      }
    }
  }
  console.log(sum);
};
first();

const second = () => {
  let sum = 0;
  for (const equation of data) {
    const [resultString, rest] = equation.split(":");
    const result = Number(resultString);
    const numbers = rest.trim().split(" ").map(Number);
    const combinations = generateCombinations(
      ["+", "*", "||"],
      numbers.length - 1
    );

    for (const combination of combinations) {
      const potentialResult = combination.reduce((acc, operation, idx) => {
        if (operation === "+") {
          return acc + numbers[idx + 1];
        } else if (operation === "*") {
          return acc * numbers[idx + 1];
        } else {
          return Number(`${acc}${numbers[idx + 1]}`);
        }
      }, +numbers[0]);

      if (potentialResult === result) {
        sum += result;
        break;
      }
    }
  }
  console.log(sum);
};
second();
