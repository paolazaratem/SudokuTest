(function () {
  'use strict';

  angular
    .module('Sudoku')
    .controller('SudokuController',SudokuController);

  SudokuController.$inject = ['$scope', 'SudokuService'];

  function SudokuController($scope, SudokuService){
    var vm = this;
    vm.data;
    $scope.sudokuBoard = [];
    $scope.moveRow = 0;
    $scope.moveColumn = 0;
    $scope.moveValue = 0;
    $scope.error;
    $scope.messageError;
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
          vm.data = data;
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
      console.log("params");
      console.log(params);
      return SudokuService.putBoard(params)
        .then(function(data) {
          vm.data = data;
          $scope.sudokuBoard = data.data.board;
          console.log(data);
        })
    }

    function isValidateNumber(row, col, value){
      console.log(row + " : " + col + " : " + value);
      if( value > 9 || value < 0 ){
        if(value.toString().length >= 2){
          $scope.moveValue = value;
          console.log(value.toString().length);
          $scope.moveRow = row;
          $scope.moveColumn = col;
          $scope.moveValue = value;
          $scope.error=400;
          $scope.messageError = "The value " + value + " is incorrect. The value is between 1 and 9";
          editBoard();
        }
        console.log("error");
      }else{
        $scope.moveRow = row;
        $scope.moveColumn = col;
        $scope.moveValue = value;
        editBoard();
      }
    }

     /*if (!value == undefined){
        if (!(value >= 1 && value <= 9)){
          $scope.sudokuBoard[row][col] = 0;
          console.log($scope.sudokuBoard[row][col]);
          console.log($scope.sudokuBoard);
          return $scope.moveValue=' ';
        }
        else
          return value;  
      }*/

    //ng-pattern="[0-9][10]"
    //ng-if="col==0?col=' ':col"
    //value="{{col}}"
  }
})();