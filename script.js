class ChessSquare {
  constructor(i, j) {
    this.currentLocation = [i, j];
    this.discovered = false;
    this.previousSquare = [null];
    this.shortestDistance = null;
  }

  isDiscoverd() {
    return this.discovered;
  }

  currShortestDist() {
    return this.shortestDistance;
  }

  currLocationString() {
    return this.currentLocation.join("");
  }

  prevLocationString() {
    return this.previousSquare.join("");
  }
}

class ChessBoard {
  constructor() {
    this.board = Array.from({ length: 8 }, (_, i) =>
      Array.from({ length: 8 }, (_, j) => new ChessSquare(i, j))
    );
  }
}

class Knight {
  constructor(chessBoard) {
    this.chessBoard = chessBoard;

    this.dx = [2, 2, -2, -2, 1, -1, 1, -1];
    this.dy = [1, -1, 1, -1, 2, 2, -2, -2];
  }

  nextMovableSquares(start) {
    const nextSetOfMovableSquares = [];

    for (let i = 0; i < 8; i++) {
      const newX = start[0] + this.dx[i];
      const newY = start[1] + this.dy[i];

      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < 8 &&
        newY < 8 &&
        !this.chessBoard.board[newX][newY].isDiscoverd()
      ) {
        nextSetOfMovableSquares.push([newX, newY]);
      }
    }
    return nextSetOfMovableSquares;
  }

  moveKnight(start = [0, 0], end = [2, 1]) {
    const pathArray = [];
    pathArray.push(start);

    this.chessBoard.board[start[0]][start[1]].discovered = true;

    if (start == end) {
      return end;
    }

    const nextSetOfMovableSquares = this.nextMovableSquares(start);

    for (let i = 0; i < nextSetOfMovableSquares.length; i++) {
      const currentProbingSquare = nextSetOfMovableSquares[i];
      this.chessBoard.board[currentProbingSquare[0]][
        currentProbingSquare[1]
      ].discovered = true;

      const tempPathArray = pathArray.concat(
        this.moveKnight(currentProbingSquare, end)
      );

      if (i > 0 && tempPathArray.length < pathArray.length) {
        pathArray = tempPathArray;
      } else {
        continue;
      }
    }

    // pathArray.reverse();

    return pathArray;
  }
}

const cb = new ChessBoard();
const k1 = new Knight(cb);

console.log(k1.moveKnight([0, 0], [5, 4]));
