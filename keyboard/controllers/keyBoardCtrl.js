var app = angular.module('keyboard_app', []);

app.controller('keyboardCtrl', ['$scope', function($scope) {

	$scope.showKeyboard = true;

	$scope.inputAction = function(data) {
		$scope.inputedNum = data;
		console.log(data);
	}

	$scope.finishAction = function(data) {
		$scope.showKeyboard = false;
	}
}]);