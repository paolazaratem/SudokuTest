(function () {
	'use strict';

	angular
	    .module('Sudoku')
	    .directive('onlyDigits', onlyDigits);

	    /*
	    Description: this directive valite the user only put numbers
	    Use: <input only-digits>
	    */
	 	function onlyDigits(){
		    return {
		      require: 'ngModel',
		      restrict: 'A',
		      link: function (scope, element, attr, ctrl) {
		        function inputValue(val) {
		          if (val) {
		            var digits = val.replace(/[^1-9]/g, '');
		            if (digits !== val) {
		              ctrl.$setViewValue(digits);
		              ctrl.$render();
		            }
		            return parseInt(digits,10);
		          }
		          return undefined;
		        }            
		        ctrl.$parsers.push(inputValue);
		      }
		    };
		}
 })();