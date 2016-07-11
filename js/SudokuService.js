(function () {
	'use strict';
	
	angular
	    .module('Sudoku')
	    .service('SudokuService', SudokuService);

	SudokuService.$inject = ['$http'];

	function SudokuService($http) {

		var service = {
            getBoard: getBoard,
            putBoard: putBoard
        };

		return service;

		function getBoard() {
            return $http({method: 'GET', url: 'https://afternoon-mountain-94217v2.herokuapp.com/sudoku/'}).
                success(function(data, status, headers, config) {
                    console.log("ok");
                    console.log(data);
                    return data.sudokuBoard;
                }).
                error(function(data, status, headers, config) {
                    console.log("error");
                    console.log(data);
                });
		}

		function putBoard(value) {
			var params = { "sudokuBoard":[
							[7,0,0,0,4,0,5,3,0],
							[0,0,5,0,0,8,0,1,0],
							[0,0,8,5,0,9,0,4,0],
							[5,3,9,0,6,0,0,0,1],
							[0,0,0,0,1,0,0,0,5],
							[8,0,0,7,2,0,9,0,0],
							[9,0,7,4,0,0,0,0,0],
							[0,0,0,0,5,7,0,0,0],
							[6,0,0,0,0,0,0,5,0]
							],
							"moveRow" : 1,
							"moveColumn" : 0,
							"moveValue" : 2
			};
		    var config = { headers: { "Content-Type" : "application/json" } };

           	return $http({method: 'PUT', url: 'https://afternoon-mountain-94217v2.herokuapp.com/sudoku', data:params }).
                success(function(data, status, headers, config) {
                    console.log("ok");
                    console.log(data);
                    return data.data;
                }).
                error(function(data, status, headers, config) {
                    console.log("error");
                    console.log(data.data);
                });
		}
	}
})();