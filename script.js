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

function knightMoves(start = [0, 0], end = [2, 1]) {
  let i = 0;
  let stepsTaken = 0;
  const discoverdSquares = [
    {
      location: start,
      previousSquare: null,
      steps: 0,
    },
  ];

  let currentNode = chessBoard[start[0]][start[1]];
  let currenSquare = start;

  while (i++ < 1) {
    for (let i = 0; i < currentNode.length; i++) {
      let node = currentNode[i];
      let nodeObj = {
        location: node,
        previousSquare: currenSquare,
        steps: i,
      };

      if (nodeObj.location[0] == end[0] && nodeObj.location[1] == end[1]) {
        stepsTaken = nodeObj.steps;
        return stepsTaken;
      }
    }
  }
}

const moves = knightMoves();
console.log(moves);
