const { readFile } = require("./utils");

const data = readFile("data.txt").split("");

const first = () => {
  const decodedDisk = data.reduce(
    (acc, currNumber, idx) => {
      let symbol = ".";

      if (idx % 2 === 0) {
        symbol = acc.currId;
        acc.currId++;
      }

      for (let i = 0; i < currNumber; i++) {
        acc.result.push(symbol);
      }

      return acc;
    },
    { result: [], currId: 0 }
  ).result;

  const removedFreeSpaces = decodedDisk.reduce((acc, currSymbol, idx, arr) => {
    if (currSymbol === ".") {
      let nextSymbol = arr.pop();

      while (nextSymbol === ".") {
        nextSymbol = arr.pop();
      }

      arr[idx] = nextSymbol;
    }

    return arr;
  });

  const checkSum = removedFreeSpaces.reduce((acc, currNumber, idx) => {
    return acc + currNumber * idx;
  }, 0);
};

const second = () => {
  const decodedDisk = [];
  const freeSpace = [];
  const final = [];
  let fileId = 0;
  let position = 0;

  for (let i = 0; i < data.length; i++) {
    const currentNumber = Number(data[i]);
    if (i % 2 === 0) {
      decodedDisk.push({
        position,
        size: currentNumber,
        fileId,
      });
      for (let j = 0; j < currentNumber; j++) {
        final.push(fileId);
        position += 1;
      }
      fileId += 1;
    } else {
      freeSpace.push({ position, size: currentNumber });
      for (let j = 0; j < currentNumber; j++) {
        final.push(null);
        position += 1;
      }
    }
  }

  for (let i = decodedDisk.length - 1; i >= 0; i--) {
    const { position, size, fileId } = decodedDisk[i];
    for (let j = 0; j < freeSpace.length; j++) {
      const { position: freePosition, size: freeSize } = freeSpace[j];
      if (freePosition < position && size <= freeSize) {
        for (let k = 0; k < size; k++) {
          final[position + k] = null;
          final[freePosition + k] = fileId;
        }
        freeSpace[j].position = freePosition + size;
        freeSpace[j].size = freeSize - size;
        break;
      }
    }
  }

  const checkSum = final.reduce(
    (acc, currNumber, idx) => acc + (currNumber || 0) * idx,
    0
  );

  console.log(checkSum);
};
