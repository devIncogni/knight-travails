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

    this.dx = [2, 2, -2, -2, 1, -1, 1, -1];
    this.dy = [1, -1, 1, -1, 2, 2, -2, -2];
  }
}

class Knight {
  constructor(chessBoard) {
    this.chessBoard = chessBoard;
  }

  moveKnight(start = [0, 0], end = [2, 1]) {}
}
