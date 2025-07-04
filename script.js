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

  reverseTracePath(end) {
    let root = this.chessBoard.board[end[0]][end[1]];
    const pathArr = [];
    while (root.previousSquare !== null) {
      pathArr.push(root.currentLocation);
      let prevSq = root.previousSquare;
      root = this.chessBoard.board[prevSq[0]][prevSq[1]];
    }
    pathArr.push(root.currentLocation);

    pathArr.reverse();
    return pathArr;
  }

  moveKnight(start = [0, 0], end = [2, 1]) {
    let dQueue = [start];
    for (let i = 0; i < dQueue.length; i++) {
      const currSq = dQueue[i];
      if (currSq[0] == end[0] && currSq[1] == end[1]) {
        return this.reverseTracePath(end);
      }
      dQueue = dQueue.concat(this.updateEstimates(currSq));
    }
  }
}

const cb = new ChessBoard();
const k1 = new Knight(cb);

console.log(k1.moveKnight([0, 0], [5, 4]));
