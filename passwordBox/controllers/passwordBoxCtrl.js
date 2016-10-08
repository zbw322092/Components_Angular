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


}]);








































