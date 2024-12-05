const { readFile } = require("./utils");

const [rules, updates] = readFile("data.txt", "\n\n");

const rulesMap = rules.split("\n").reduce((acc, rule) => {
  const [left, right] = rule.split("|");

  acc[right] = {
    before: [...(acc[right]?.before || []), left],
  };

  return acc;
}, {});

const first = () => {
  const middleSum = updates.split("\n").reduce((acc, update) => {
    const updatesArr = update.split(",");

    for (let i = 1; i < updatesArr.length; i++) {
      const current = updatesArr[i];
      const next = updatesArr[i - 1];

      if (!rulesMap[current]?.before.includes(next)) {
        return acc;
      }
    }

    return acc + +updatesArr[Math.floor(updatesArr.length / 2)];
  }, 0);

  console.log(middleSum);
};

const second = () => {
  function sortWithRules(unorderedArray, map) {
    return unorderedArray.sort((a, b) => {
      if (map[a]?.before.includes(b)) return 1;

      if (map[b]?.before.includes(a)) return -1;

      return 0;
    });
  }

  const middleSum = updates.split("\n").reduce((acc, update) => {
    const updatesArr = update.split(",");

    let incorrect = false;
    for (let i = 1; i < updatesArr.length; i++) {
      const current = updatesArr[i];
      const next = updatesArr[i - 1];

      if (!rulesMap[current]?.before.includes(next)) {
        incorrect = true;
      }
    }

    if (incorrect) {
      const sorted = sortWithRules(updatesArr, rulesMap);
      return acc + +sorted[Math.floor(sorted.length / 2)];
    }

    return acc;
  }, 0);

  console.log(middleSum);
};
