const fs = require("fs");

const readFile = (file, splitBy) => {
  const data = fs.readFileSync(file, {
    encoding: "utf8",
    flag: "r",
  });

  if (splitBy) {
    return data.split(splitBy);
  }

  return data;
};

module.exports = {
  readFile,
};
