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

  function recurser(board, numPieces) {
    if (numPieces === n) {

      return board;
    } 
    //Iterate through each option;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //Toggle and Check if valid
        //If there is currently a piece at (row, col)
        if (solution.rows()[row][col] === 1) {
          continue;
        } else {
          solution.togglePiece(row, col);
          if (solution.hasAnyRooksConflicts()) {
            solution.togglePiece(row, col); //untoggle it            
          } else { //no conflicts
            recurser(solution, numPieces + 1);
          }
        }
      }
    }

  }
  recurser(solution, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n: n});
  var boards = [];
  
  /*function recurser(board, numPieces) {
    if (numPieces === n) {
      solutionCount++;
    } 

    //Iterate through each option;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        recurser(board, numPieces, row, col);
        //Toggle and Check if valid
        //If there is currently a piece at (row, col)
        if (solution.rows()[row][col] === 1) {
          continue;
        } else {
          solution.togglePiece(row, col);
          if (solution.hasAnyRooksConflicts()) {
            solution.togglePiece(row, col); //untoggle it            
          } else { //no conflicts
            recurser(solution, numPieces + 1);
          }
        }
      }
    }
  }*/
  function recurser(board, numPieces, lastPieceRow, lastPieceCol) {
    if (numPieces === n) {
      solutionCount++;
    } 

/*    if (numPieces > n) {
      return;
    }*/

    var col = lastPieceCol;
    for (var row = lastPieceRow; row < n; row++) {
      for (; col < n; col++) {
        var copy = jQuery.extend(true, {}, board);
        if (copy.rows()[row][col] === 1) {  // if there's a piece already, try next one
          continue;
        } else {  // else try if it works
          copy.togglePiece(row, col);
          if (!copy.hasAnyRooksConflicts()) {
            recurser(copy, numPieces + 1, row, col + 1);
          }
        }
      }
      col = 0;
    }
  }
 
  recurser(solution, 0, 0, 0);
  
  


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
