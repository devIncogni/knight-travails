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
      const newX = start[0] + dx[i];
      const newY = start[1] + dy[i];

      if (newX >= 0 && newY >= 0 && newX < 8 && newY < 8) {
        nextSetOfMovableSquares.push([newX, newY]);
      }
    }
    return nextSetOfMovableSquares;
  }

  moveKnight(start = [0, 0], end = [2, 1]) {
    if (start == end) {
      return end;
    }

    const nextSetOfMovableSquares = this.nextMovableSquares(start);

    for (let i = 0; i < nextSetOfMovableSquares.length; i++) {
      const currentProbingSquare = nextSetOfMovableSquares[i];
      
    }
  }
}
