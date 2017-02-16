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

  function recurser(numPieces, thisRow) {
    if (numPieces === n || thisRow == n) {
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
  }
  recurser(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount;
  var solution = new Board({n: n});
  
  function recurserFunction(board, numPieces, thisRow) {
    if (numPieces === n) {
      solutionCount++;
      return;
    }

    if (thisRow >= n){
      return;
    }
    // For each column of this row, check if toggle will work
    for (var col = 0; col < n; col++) {
      var copy = jQuery.extend(true, {}, board);
      copy.togglePiece(thisRow, col);
      if (!copy.hasAnyRooksConflicts()) {
        recurserFunction(copy, numPieces + 1, thisRow + 1);
      }
    }
  }

  // recurserFunction(solution, 0, 0);

  // Factorial using memoization + recursion
  var factorials = [];
  function factorial (n) {
    if (n == 0 || n == 1)
      return 1;
    if (factorials[n] > 0)
      return factorials[n];
    return factorials[n] = factorial(n-1) * n;
  };

  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  
  function recurserFunction(board, numPieces, thisRow) {
    if (numPieces === n) {
      solution = board;
      return true;
    }

    if (thisRow >= n){
      return;
    }
    // For each column of this row, check if toggle will work
    for (var col = 0; col < n; col++) {
      var copy = jQuery.extend(true, {}, board);
      copy.togglePiece(thisRow, col);
      if (!copy.hasAnyQueensConflicts()) {
        if(recurserFunction(copy, numPieces + 1, thisRow + 1)) {
          return true;
        }
      }
      
    }
  }

  recurserFunction(solution, 0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solution = new Board({n: n});
  
  function recurserFunction(board, numPieces, thisRow) {
    if (numPieces === n) {
      solutionCount++;
    }

    if (thisRow >= n){
      return;
    }
    // For each column of this row, check if toggle will work
    for (var col = 0; col < n; col++) {
      var copy = jQuery.extend(true, {}, board);
      copy.togglePiece(thisRow, col);
      if (!copy.hasAnyQueensConflicts()) {
        recurserFunction(copy, numPieces + 1, thisRow + 1);
      }
      
    }
  }

  recurserFunction(solution, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.sameBoard = function(board1, board2) {
  for (var row = 0; row < board1.rows().length; row++) {
    for (var col = 0; col < board2.rows().length; col++) {
      if (board1.rows()[row][col] !== board2.rows()[row][col]) {
        return false;
      }
    }
  }
  return true;
};
