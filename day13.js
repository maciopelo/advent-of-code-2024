const { readFile } = require("./utils");

const data = readFile("data.txt", "\n\n").map((machine) => {
  const buttonRe = /(\d)+/g;
  const numbers = [...machine.matchAll(buttonRe)];
  return {
    a: { x: +numbers[0][0], y: +numbers[1][0], cost: 3 },
    b: { x: +numbers[2][0], y: +numbers[3][0], cost: 1 },

    prize: { x: +numbers[4][0], y: +numbers[5][0] },
  };
});

// metoda wyznaczników
function solveLinearEquations(a1, b1, c1, a2, b2, c2) {
  const delta = a1 * b2 - a2 * b1;
  const deltaX = c1 * b2 - c2 * b1;
  const deltaY = a1 * c2 - a2 * c1;

  if (delta === 0) {
    throw new Error("The system has no unique solution");
  }

  const x = deltaX / delta;
  const y = deltaY / delta;

  return { x, y };
}

const first = () => {
  let tokens = 0;
  for (const eq of data) {
    const a = eq.a;
    const b = eq.b;
    const prize = eq.prize;

    const result = solveLinearEquations(a.x, b.x, prize.x, a.y, b.y, prize.y);

    if (Number.isInteger(result.x + result.y)) {
      tokens += a.cost * result.x + b.cost * result.y;
    }
  }
  console.log(tokens);
};
first();

const second = () => {
  const add = 10_000_000_000_000;

  let tokens = 0;
  for (const eq of data) {
    const a = eq.a;
    const b = eq.b;
    const prize = eq.prize;

    const result = solveLinearEquations(
      a.x,
      b.x,
      prize.x + add,
      a.y,
      b.y,
      prize.y + add
    );

    if (Number.isInteger(result.x + result.y)) {
      tokens += a.cost * result.x + b.cost * result.y;
    }
  }
  console.log(tokens);
};
second();
