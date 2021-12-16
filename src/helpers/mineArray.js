export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getNumberedArray = (arr, width, height) => {
  // width and height are the dimensions of the array as measured by the number of columns and rows
  const numberedArray = arr.map((elem, index) => {
    if (elem === "mine") return "mine";
    let mineCount = 0;
    // Yep... No way this will increase time complexity...
    const adjacents = getAdjacentCellIndices(index, width, arr.length);
    adjacents.forEach((elem) => {
      if (arr[elem] === "mine") mineCount++;
    });
    return mineCount === 0 ? "" : mineCount;
  });

  return numberedArray;
};

export function getAdjacentCellIndices(index, width, length) {
  // Given a cell index in a 1-d array, divided into rows of width, return the indices of the adjacent cells
  // Determine x, y coordinates of cell
  const x = index % width;
  const y = Math.floor(index / width);

  // Get indices of adjacent cells
  const adjacentCellIndices = [
    // Lateral adjacents
    [x - 1, y],
    [x + 1, y],
    // Vertical adjacents
    [x, y - 1],
    [x, y + 1],
    // Diagonals
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y + 1],
  ];

  // Remove cells that are out of bounds
  const validAdjacentCells = adjacentCellIndices.filter((elem) => {
    return (
      elem[0] >= 0 &&
      elem[0] < width &&
      elem[1] >= 0 &&
      elem[1] < length / width
    );
  });

  // Convert adjacent cell indices to 1-d array indices
  const oneDimensionIndices = validAdjacentCells.map((elem) => {
    if (elem[1] === 0) return elem[0];
    return elem[1] * width + elem[0];
  });

  // Return array of 1-d array indices
  return oneDimensionIndices;
}
