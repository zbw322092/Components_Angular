var app = angular.module('keyboard_app', []);

app.controller('keyboardCtrl', ['$scope', function($scope) {
	$scope.inputAction = function(data) {
		$scope.inputedNum = data;
	}
}]);