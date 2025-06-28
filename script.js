const chessBoard = Array.from({ length: 8 }, (_, i) => {
  return Array.from({ length: 8 }, (_, j) => {
    const verticies = [];
    const dx = [1, -1, 1, -1, 2, -2, 2, -2];
    const dy = [2, 2, -2, -2, 1, 1, -1, -1];

    for (let l = 0; l < 8; l++) {
      let vertex = [i + dx[l], j + dy[l]];
      if (vertex[0] >= 0 && vertex[1] >= 0 && vertex[0] < 8 && vertex[1] < 8) {
        verticies.push(vertex);
      }
    }
    return verticies;
  });
});

// console.table(chessBoard);

function knightMoves(start = [0, 0], end = [5, 4]) {
  let i = 0;
  let stepsTaken = 0;
  const discoverdSquares = [
    {
      location: start,
      previousSquare: null,
      steps: 0,
    },
  ];

  //   let currentNode = chessBoard[start[0]][start[1]];
  //   let currentSquare = start;

  //   while (i++ < 1) {
  for (let i = 0; i < discoverdSquares.length; i++) {
    let currentSquare = discoverdSquares[i].location;
    let currentNode = chessBoard[currentSquare[0]][currentSquare[1]];

    for (let j = 0; j < currentNode.length; j++) {
      let node = currentNode[j];
      let nodeObj = {
        location: node,
        previousSquare: currentSquare,
        steps: discoverdSquares[i].steps + 1,
      };

      discoverdSquares.push(nodeObj);

      if (nodeObj.location[0] == end[0] && nodeObj.location[1] == end[1]) {
        stepsTaken = nodeObj.steps;
        return stepsTaken;
      }
    }
  }

  //   }
}

const moves = knightMoves();
console.log(moves);
