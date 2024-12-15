const { readFile } = require("./utils");
const fs = require("fs");

const data = readFile("data.txt", "\n");

const robots = data.map((line) => {
  const re = /(\-)?(\d)+/g;
  const numbers = [...line.matchAll(re)];
  return {
    x: +numbers[0][0],
    y: +numbers[1][0],
    dx: +numbers[2][0],
    dy: +numbers[3][0],
  };
});

const width = 101;
const height = 103;
const seconds = 100;
const xLine = Math.floor(width / 2);
const yLine = Math.floor(height / 2);

const first = () => {
  const countSafetyFactor = (robots) => {
    const robotsInQuadrants = robots.reduce(
      (acc, robot) => {
        if (robot.x < xLine && robot.y < yLine) {
          acc[0] += 1;
          return acc;
        }
        if (robot.x > xLine && robot.y < yLine) {
          acc[1] += 1;
          return acc;
        }
        if (robot.x > xLine && robot.y > yLine) {
          acc[2] += 1;
          return acc;
        }
        if (robot.x < xLine && robot.y > yLine) {
          acc[3] += 1;
          return acc;
        }

        return acc;
      },
      [0, 0, 0, 0] // leftTop, rightTop, rightBottom, leftBottom
    );

    const safetyFactor = robotsInQuadrants.reduce((acc, c) => acc * c, 1);

    return safetyFactor;
  };

  for (let s = 0; s < seconds; s++) {
    for (const robot of robots) {
      if (robot.y + robot.dy < 0) {
        robot.y = height - Math.abs(robot.y + robot.dy);
      } else if (robot.y + robot.dy > height - 1) {
        robot.y = robot.y + robot.dy - height;
      } else {
        robot.y += robot.dy;
      }

      if (robot.x + robot.dx < 0) {
        robot.x = width - Math.abs(robot.x + robot.dx);
      } else if (robot.x + robot.dx > width - 1) {
        robot.x = robot.x + robot.dx - width;
      } else {
        robot.x += robot.dx;
      }
    }
  }

  const safetyFactor = countSafetyFactor(robots);
  console.log("🚀 ~ first ~ safetyFactor:", safetyFactor);
};

const second = () => {
  const positions = new Set();
  for (let s = 0; s < Infinity; s++) {
    positions.clear();
    for (const robot of robots) {
      if (robot.y + robot.dy < 0) {
        robot.y = height - Math.abs(robot.y + robot.dy);
      } else if (robot.y + robot.dy > height - 1) {
        robot.y = robot.y + robot.dy - height;
      } else {
        robot.y += robot.dy;
      }

      if (robot.x + robot.dx < 0) {
        robot.x = width - Math.abs(robot.x + robot.dx);
      } else if (robot.x + robot.dx > width - 1) {
        robot.x = robot.x + robot.dx - width;
      } else {
        robot.x += robot.dx;
      }
      positions.add(`${robot.x},${robot.y}`);
    }
    if (positions.size === robots.length) {
      console.log("🚀 ~ second ~ s:", s + 1);
      let result = "";
      for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
          if (positions.has(`${x},${y}`)) {
            row += "#";
          } else {
            row += ".";
          }
        }
        row += "\n";
        result += row;
      }
      fs.writeFileSync("output.txt", result);
      return;
    }
  }
};
