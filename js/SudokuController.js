/* SudokuController - the controller for the "Sudoku view" with methods createBoardDefault and editBoard
 * relies on Angular injector to provide:
 *     $scope - Is available for the access the var of the view and the controller 
 *     SudokuService - the application data access service (methods getBoard y putBoard).
 */
(function () {
  'use strict';

  angular
    .module('Sudoku')
    .controller('SudokuController',SudokuController);

  SudokuController.$inject = ['$scope', 'SudokuService'];

  function SudokuController($scope, SudokuService){
    var vm = this;
    $scope.sudokuBoard = [];
    $scope.moveRow = 0;
    $scope.moveColumn = 0;
    $scope.moveValue = 0;
    $scope.message;
    $scope.isValidateNumber = isValidateNumber;

    vm.createBoardDefault = createBoardDefault;
    vm.editBoard = editBoard;
    vm.activate = activate;

    $scope.isHorizontalLine = isHorizontalLine;
    
    activate();

    function activate() {
      return createBoardDefault();
    }

    function createBoardDefault(){
      return SudokuService.getBoard()
        .then(function(data) {
          $scope.sudokuBoard = data.data.sudokuBoard;
        })
        .catch(function(error) {
          if(error.status == 404 || error.status == 500){
            $scope.message = "In this moment, we can't process your request , please try again later";
          } 
        })
    }

    function editBoard(){
      var params = {
        "sudokuBoard": $scope.sudokuBoard,
        "moveRow": $scope.moveRow,
        "moveColumn": $scope.moveColumn,
        "moveValue": $scope.moveValue
      }; 
      return SudokuService.putBoard(params)
        .then(function(data) {
          if(data.data.gameOver === true){
            $scope.message = "!!You win!! You can begin a new game"
          }
          $scope.sudokuBoard = data.data.board;
        })
        .catch(function(error) {
          if( error !== 'undefined' ){
            if(error.status == 400){
              $scope.message = "Input parameters not correct,The value is between 1 and 9";
            }
            else if(error.status == 409){
              $scope.message = "Move not allowed, body consist of status, conflict row " + error.data.conflictRow + " and conflict column " + error.data.conflictColumn;
            }
            else if(error.status == 404 || error.status == 500){
               $scope.message = "In this moment, we can't process your request , please try again later";
            } 
          }
        })
    }

    function isValidateNumber(row, col, value){
      $scope.moveRow = row;
      $scope.moveColumn = col;
      $scope.moveValue = value;
      editBoard();
      $scope.message="";
    }

    function isHorizontalLine(row){
     if( (row+1)%3 == 0 )
       return "black-line";
     else
       return "";
   }
  }
})();