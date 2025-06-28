class ChessSquare {
  constructor(i, j) {
    this.currentLocation = [i, j];
    this.discovered = false;
    this.previousSquare = null;
    this.shortestDistance = 0;
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
        !this.chessBoard.board[newX][newY].discovered
      ) {
        nextSetOfMovableSquares.push([newX, newY]);
      }
    }
    return nextSetOfMovableSquares;
  }

  updateEstimates(start) {
    const currSqObj = this.chessBoard.board[start[0]][start[1]];
    currSqObj.discovered = true;
    const stepsUpToStart = currSqObj.shortestDistance;

    const nextSetOfMovableSquares = this.nextMovableSquares(start);

    for (let i = 0; i < nextSetOfMovableSquares.length; i++) {
      const selNxtMovSq = nextSetOfMovableSquares[i];
      const selNxtMovSqObj =
        this.chessBoard.board[selNxtMovSq[0]][selNxtMovSq[1]];

      if (
        selNxtMovSqObj.shortestDistance === 0 ||
        stepsUpToStart + 1 < selNxtMovSqObj.shortestDistance
      ) {
        selNxtMovSqObj.shortestDistance = stepsUpToStart + 1;
        selNxtMovSqObj.previousSquare = start;
      }
    }

    return nextSetOfMovableSquares;
  }



  moveKnight(start = [0, 0], end = [2, 1]) {
    if (start[0] == end[0] && start[1] == end[1]) {
      return start;
    }
    const endObj = this.chessBoard.board[end[0]][end[1]];
    const squares = [[start]];
    // curr = start
    for (let i = 0; i < squares.length; i++) {
      squares[i + 1] = [];
      const currSetOfSq = squares[i];
      for (let j = 0; j < currSetOfSq.length; j++) {
        const currSq = currSetOfSq[j];
        if (currSq[0] == end[0] && currSq[1] == end[1]) {
          return endObj.shortestDistance;
        }
        squares[i + 1] = squares[i + 1].concat(this.updateEstimates(currSq));
      }
    }
  }
}

const cb = new ChessBoard();
const k1 = new Knight(cb);

console.log(k1.moveKnight([0, 0], [5, 4]));
