angular
    .module('Sudoku')
    .directive('onlyDigits', onlyDigits)
    .directive('inputMaxlength', inputMaxlength);

 	function onlyDigits() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');
            if(digits.length == 1){
            	console.log("paola");

	            if (digits !== val) {
	              ctrl.$setViewValue(digits);
	              ctrl.$render();
	            }
	            return parseInt(digits,10);
	        }
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
	}

	function inputMaxlength() {
	  	return {
		    require: 'ngModel',
		    link: function (scope, element, attrs, ngModelCtrl) {
		      var maxlength = Number(attrs.inputMaxlength);
		      function fromUser(text) {
		          if (text.length > maxlength) {
		            var transformedInput = text.substring(0, maxlength);
		            ngModelCtrl.$setViewValue(transformedInput);
		            ngModelCtrl.$render();
		            return transformedInput;
		          } 
		          return text;
		      }
		      ngModelCtrl.$parsers.push(fromUser);
		    }
  		}; 
	}

	/*function onlyDigits() {
		return {
	        restrict: 'A',
	        require: '?ngModel',
	        link: function (scope, element, attrs, ngModel) {
	            if (!ngModel) return;
	            ngModel.$parsers.unshift(function (inputValue) {
	                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
	                ngModel.$viewValue = digits;
	                ngModel.$render();
	                return digits;
	            });
	        }
	    };
	}*/