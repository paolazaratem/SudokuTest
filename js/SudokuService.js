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
                    return data.sudokuBoard;
                }).
                error(function(data, status, headers, config) {
                    var error = {};
                    error.status = status;
                    return error;
                });
		}

		function putBoard(params) {
		    var config = { headers: { "Content-Type" : "application/json" } };
           	return $http({method: 'PUT', url: 'https://afternoon-mountain-94217v2.herokuapp.com/sudoku', data:params }).
                success(function(data, status, headers, config) {
                    return data.data;
                }).
                error(function(data, status, headers, config) {
                    var error = {};
                    error.status = status;
                    return error;
                });
		}
	}
})();