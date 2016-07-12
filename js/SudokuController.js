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
    
    activate();

    function activate() {
      return createBoardDefault();
    }

    function createBoardDefault(){
      return SudokuService.getBoard()
        .then(function(data) {
          $scope.sudokuBoard = data.data.sudokuBoard;
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
            $scope.message = "!!! You win !!!"
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
          }
        })
    }

    function isValidateNumber(row, col, value){
      if( value > 9 || value < 0 ){
        if(value.toString().length >= 2){
          $scope.moveValue = value;
          $scope.moveRow = row;
          $scope.moveColumn = col;
          $scope.moveValue = value;
          $scope.message = "The value " + value + " is incorrect. The value is between 1 and 9";
          editBoard();
        }
      }else{
        $scope.messageError = "";
        $scope.moveRow = row;
        $scope.moveColumn = col;
        $scope.moveValue = value;
        editBoard();
      }
    }
  }
})();