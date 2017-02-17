importScripts('lib/underscore.js', 'lib/backbone.js', 'src/Board.js');
self.addEventListener('message', function(e) {
  var data = e.data;
  var n = parseInt(data.boardSize);
  var solutionCount = 0;
  
  var solution = new Board({n: n});

  // not using copy
  var recurserFunction = function(numPieces, thisRow) {
    if (numPieces === n) {
      solutionCount++;
      return;
    }

    if (thisRow >= n) {
      return;
    }
    // For each column of this row, check if toggle will work
    for (var col = 0; col < n; col++) {
      solution.togglePiece(thisRow, col);
      if (!solution.hasAnyQueensConflicts()) {
        recurserFunction(numPieces + 1, thisRow + 1);
      }
      solution.togglePiece(thisRow, col);
    }
  };

  var recurserFunctionInit = function(numPieces, thisRow) {
    if (numPieces === n) {
      solutionCount++;
      return;
    }

    if (thisRow >= n) {
      return;
    }
    // For each column of this row, check if toggle will work
    colLimit = (n % 2 === 0) ? n / 2 : n;
    for (var col = 0; col < colLimit; col++) {
      solution.togglePiece(thisRow, col);
      if (!solution.hasAnyQueensConflicts()) {
        recurserFunction(numPieces + 1, thisRow + 1);
      }
      solution.togglePiece(thisRow, col);
    }
  };
  recurserFunctionInit(0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  self.postMessage(solutionCount);

}, false);