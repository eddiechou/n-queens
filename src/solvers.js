/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  var recurser = function(numPieces, thisRow) {
    if (numPieces === n || thisRow === n) {
      return true;
    } 
    //Iterate through each option;
    for (var col = 0; col < n; col++) {
      //Toggle and Check if valid
      //If there is currently a piece at (row, col)
      solution.togglePiece(thisRow, col);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(thisRow, col); //untoggle it            
      } else { //no conflicts
        if (recurser(numPieces + 1, thisRow + 1)) {
          return;
        }
      }
    }
  };
  recurser(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount;
  
  // Factorial using memoization + recursion
  var factorials = [];
  var factorial = function(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    if (factorials[n] > 0) {
      return factorials[n];
    }
    return factorials[n] = factorial(n - 1) * n;
  };

  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  var recurserFunction = function(numPieces, thisRow) {
    if (numPieces === n) {
      return true;
    }

    if (thisRow >= n) {
      return;
    }
    // For each column of this row, check if toggle will work
    for (var col = 0; col < n; col++) {
      solution.togglePiece(thisRow, col);
      if (!solution.hasAnyQueensConflicts()) {
        if (recurserFunction(numPieces + 1, thisRow + 1)) {
          return true;
        }
      }
      solution.togglePiece(thisRow, col);
    }
  };
  recurserFunction(0, 0 );

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
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
  if (n === 0) {
    return 1;
  }

  // If n is even, we can just get the number of solutions for half the board and double the value
  return n % 2 === 0 ? solutionCount * 2 : solutionCount;
};


/* 
 * Using Web Workers instead
 */

// Todo: will need to change tests since result will return asynchronously
window.countNQueensSolutionsAsync = function(n) {

  var worker = new Worker('../doNQueensWork.js');
  var boardSize = n;

  worker.postMessage({'boardSize': '' + boardSize});
  
  worker.addEventListener('message', function(e) {
    return e.data;
  });
};







