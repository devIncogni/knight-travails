class ChessSquare {
  constructor(i, j) {
    this.currentLocation = [i, j];
    this.discovered = false;
    this.previousSquare = null;
    this.shortestDistance = null;
  }
}

class ChessBoard {
  constructor() {
    this.board = Array.from({ length: 8 }, (_, i) =>
      Array.from({ length: 8 }, (_, j) => new ChessSquare(i, j))
    );
  }
}
