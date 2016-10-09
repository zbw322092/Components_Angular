var app = angular.module('password_box_app', []);

app.controller('passwordBoxCtrl', ['$scope','$timeout', function ($scope, $timeout) {
	var inputDom = document.getElementsByClassName('password-input');
	// prototype chain
	console.log($scope);
	console.log($scope.$apply);

	console.log(inputDom);
	console.log(typeof inputDom);


	$scope.focusToInput = function() {
		inputDom[0].focus();
	}

	$scope.passwordDot = new Array('','','','','','');
	
	$scope.inputValueFunc = function() {
		var passwordArray =  $scope.inputedValue.split("");
		for (var i = 0; i < passwordArray.length; i++) {
			$scope.passwordDot[i] = '*';
		}
	}

}]);








































